import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerSelection } from 'app/datatypes/AnswerSelected';
import { Question } from 'app/datatypes/server/Question';
import { QuizAnswer } from 'app/datatypes/server/QuizAnswer';
import { ServerCode } from 'app/datatypes/ServerCode';
import { AnswersService } from 'app/services/AnswersService';
import { AuthorizationService } from 'app/services/auth/AuthorizationService';
import { KeyboardService } from 'app/services/KeyboardService';
import { QuizService } from 'app/services/QuizService';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    loading: boolean;

    current: number;
    currAnswered: boolean;
    currCorrect: boolean;
    answers: AnswerSelection[];

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (this.keyboardService.isEnter(event) && this.currAnswered) {
            this.next();
        }
    }

    constructor(private quizService: QuizService,
        private authorizationService: AuthorizationService,
        private answersService: AnswersService,
        private keyboardService: KeyboardService,
        private router: Router) {
        this.current = 0;
        this.loading = true;
        this.currAnswered = false;
        this.answers = [];
    }

    ngOnInit() {
        if (!this.quizService.hasQuestions()) {
            this.authorizationService.notifyLogin()
                .subscribe(
                    notifyLoginResponse => {
                        this.loading = false;
                        if (notifyLoginResponse.code === ServerCode.CODE_NOT_VERIFIED) {
                            // show mastercode form
                            this.router.navigate(['verify']);
                        } else {
                            // questions are retured, go to test
                            this.quizService.initQuiz(notifyLoginResponse.test, notifyLoginResponse.questions);
                            this.quizService.notifyCurrQuestionFeatures(this.current);
                        }
                    },
                    error => {
                        this.loading = false;
                        console.error(error);
                    }
                );
        } else {
            this.loading = false;
            this.quizService.notifyCurrQuestionFeatures(this.current);
        }
    }

    public getCurrQuestion() {
        return this.quizService.getQuestion(this.current);
    }

    public getQuestionsCount() {
        return this.quizService.getQuestionsCount();
    }

    public isLastQuestion() {
        return this.quizService.isLastQuestion(this.current);
    }

    public isCalculatorAllowed() {
        return this.quizService.isCalculatorAllowed(this.current);
    }

    public isInputType(question: Question) {
        return this.quizService.isInputType(question);
    }

    public isOptionType(question: Question) {
        return this.quizService.isOptionType(question);
    }

    public getCurrImageSrc(): string {
        return environment.host + this.getCurrQuestion().question_image;
    }

    public onAnswered(answer: AnswerSelection) {
        this.answers.push(answer);
        this.currCorrect = answer.isCorrect;
        this.currAnswered = true;
    }

    public getSuccessAnswers() {
        return this.answers && this.answers.length > 0 ?
            this.answers.map(a => a.isCorrect) :
            []
    }

    public next() {
        this.currAnswered = false;
        this.currCorrect = null;

        if (this.isLastQuestion()) {
            // send values to server 
            const answers: QuizAnswer = {
                test: this.quizService.getTestId(),
                answer: this.answers.map(a => a.selectedAnswer),
                question_id: this.quizService.getQuestionIds()
            }
            this.loading = true;
            this.answersService.sendAnswers(answers)
                .subscribe(
                    value => {
                        this.loading = false;
                        if (value.code === ServerCode.QUIZ_FINISHED) {
                            this.quizService.setResult(value);
                            this.router.navigate(['result'])
                        } else if (value.code === ServerCode.CODE_VERIFIED) {
                            this.current = 0;
                            this.currAnswered = false;
                            this.currCorrect = null
                            this.answers = [];
                            this.quizService.initQuiz(value.test, value.questions);
                            this.quizService.notifyCurrQuestionFeatures(this.current);
                        } else {
                            console.error(value);
                        }
                    },
                    error => {
                        this.loading = false;
                        console.error(error);
                    }
                );
        } else {
            this.current++;
            this.quizService.notifyCurrQuestionFeatures(this.current);
        }
    }
}