import { EventEmitter, Injectable } from '@angular/core';
import { OptionsType } from 'app/datatypes/OptionsType';
import { QuestionFeatures } from 'app/datatypes/QuestionFeatures';
import { Question } from 'app/datatypes/server/Question';
import { QuizAnswerResponse } from 'app/datatypes/server/QuizAnswerResponse';
import { TestType } from 'app/datatypes/server/TestType';

@Injectable()
export class QuizService {

    private testId: number;
    private questions: Question[];
    private result: QuizAnswerResponse;

    public currentQuestionChanged: EventEmitter<QuestionFeatures> = new EventEmitter();

    constructor() { }

    public initQuiz(testId: number, questions: Question[]) {
        this.testId = testId;
        this.questions = questions;
    }

    public setResult(value: QuizAnswerResponse) {
        this.testId = null;
        this.questions = null;
        this.result = value;
    }

    public getResult() {
        return this.result;
    }

    public hasQuestions(): boolean {
        return !!this.questions;
    }

    public isLastQuestion(index: number) {
        return this, this.questions.length - 1 == index;
    }

    public isInputType(question: Question) {
        return question.type_id === TestType.Input;
    }

    public isOptionType(question: Question) {
        return question.type_id === TestType.Options;
    }

    public isCalculatorAllowed(current: number): boolean {
        return this.getQuestion(current).calculator;
    }

    public getTestId(): number {
        return this.testId;
    }

    public getQuestion(index: number): Question {
        return this.questions[index];
    }

    public getQuestionsCount(): number {
        return this.questions.length;
    }

    public getQuestionIds(): number[] {
        return this.questions.map(q => q.id);
    }

    public getCurrOptions(question: Question): string[] {
        let options = [];
        for (let index = 0; index < 4; index++) {
            const answer = this.getCurrQuestionAnswer(question, index);
            if (answer && answer.length > 0) {
                options.push(answer);
            }
        }
        return options;
    }

    public getCurrQuestionAnswers(question: Question, answerIndex: number): { text: string, image: string } {
        let answerI: string;
        let answerImageI: string;
        switch (answerIndex) {
            case 0:
                answerI = question.answer0;
                answerImageI = question.answer0_image;
                break;
            case 1:
                answerI = question.answer1;
                answerImageI = question.answer1_image;
                break;
            case 2:
                answerI = question.answer2;
                answerImageI = question.answer2_image;
                break;
            case 3:
                answerI = question.answer3;
                answerImageI = question.answer3_image;
                break;
            default:
                answerI = '';
                answerImageI = '';
                break;
        }
        return { text: answerI, image: answerImageI };
    }

    public getCurrQuestionAnswer(question: Question, answerIndex: number): string {
        const answers = this.getCurrQuestionAnswers(question, answerIndex);
        return this.getCurrOptionsType(question, answerIndex) == OptionsType.Text ?
            answers.text :
            answers.image;
    }

    public getCurrOptionsType(question: Question, answerIndex: number): OptionsType {
        const answers = this.getCurrQuestionAnswers(question, answerIndex);

        return answers.text && answers.text.length > 0 ?
            OptionsType.Text :
            OptionsType.Image;
    }

    public getCorrectAnswerIndex(question: Question): number {
        return question.correct_answer;
    }

    public isCorrectAnswer(question: Question, answersValue: string[]): boolean {
        const correctAnswers = [0, 1, 2, 3].map(i => this.getCurrQuestionAnswer(question, i));
        return answersValue && answersValue.every((value, index) => correctAnswers[index] == value);
    }

    public notifyCurrQuestionFeatures(current: number) {
        const questionFeatures: QuestionFeatures = {
            calculatorAllowed: this.isCalculatorAllowed(current)
        }
        this.currentQuestionChanged.emit(questionFeatures)
    }
}