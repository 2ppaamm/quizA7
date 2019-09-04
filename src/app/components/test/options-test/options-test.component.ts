import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AnswerSelection } from 'app/datatypes/AnswerSelected';
import { OptionsType } from 'app/datatypes/OptionsType';
import { QuizService } from 'app/services/QuizService';
import { ValueTestBase } from '../valueTestBase';

@Component({
    selector: 'app-options-test',
    templateUrl: './options-test.component.html',
    styleUrls: ['./options-test.component.scss']
})
export class OptionsTestComponent extends ValueTestBase implements OnChanges, OnInit {

    @Output() answered: EventEmitter<AnswerSelection>;

    correctIndex: number;
    selectedIndex: number;
    isAnswered: boolean;

    options: string[];

    constructor(private quizService: QuizService) {
        super();
        this.answered = new EventEmitter();
    }

    ngOnInit() {
        this.options = this.quizService.getCurrOptions(this.question);
        this.correctIndex = this.quizService.getCorrectAnswerIndex(this.question);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.isQuestionChange(changes)) {
            this.options = this.quizService.getCurrOptions(this.question);
            this.correctIndex = this.quizService.getCorrectAnswerIndex(this.question);
            this.selectedIndex = null;
            this.isAnswered = false;
        }
    }

    public isKatexOption() {
        return this.question.answer0.indexOf('$$') >= 0;
    }

    public getKatexEquation(option: string) {
        return option.replace('$$', '').replace('$$', '');
    }

    public selectAnswer(answerIndex: number) {
        this.selectedIndex = answerIndex;
        this.isAnswered = true;

        const answer: AnswerSelection = {
            isCorrect: answerIndex == this.correctIndex,
            selectedAnswer: answerIndex
        };

        this.answered.emit(answer);
    }

    public getOptionsType(index: number): OptionsType {
        return this.quizService.getCurrOptionsType(this.question, index);
    }
}