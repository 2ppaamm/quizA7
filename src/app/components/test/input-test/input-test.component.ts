import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AnswerSelection } from 'app/datatypes/AnswerSelected';
import { QuizService } from 'app/services/QuizService';
import { ValueTestBase } from '../valueTestBase';

@Component({
    selector: 'app-input-test',
    templateUrl: './input-test.component.html',
    styleUrls: ['./input-test.component.scss']
})
export class InputTestComponent extends ValueTestBase implements OnChanges {

    inputValue: string[];
    currAnswered: boolean;
    hasQuestion: boolean;

    @Output() answered: EventEmitter<AnswerSelection>;

    constructor(private quizService: QuizService) {
        super();
        this.answered = new EventEmitter();
        this.currAnswered = false;
        this.hasQuestion = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.isQuestionChange(changes)) {
            this.currAnswered = false;
            this.hasQuestion = false;
            setTimeout(() => {
                this.hasQuestion = true;
            }, 10);

        }
    }

    public onInputChange(changedInputValue: string[]) {
        this.inputValue = changedInputValue;
    }

    public onInputEnter() {
        this.commitAnswer();
    }

    public commitAnswer() {
        this.currAnswered = true;
        const answer: AnswerSelection = {
            isCorrect: this.quizService.isCorrectAnswer(this.question, this.inputValue),
            selectedAnswer: this.inputValue
        };
        this.answered.emit(answer);
    }
}