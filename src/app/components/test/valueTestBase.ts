import { Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Question } from 'app/datatypes/server/Question';
import { environment } from 'environments/environment';

export abstract class ValueTestBase {

    @Input() public question: Question;

    public hasImage() {
        return this.question.question_image && this.question.question_image.length > 0;
    }

    public getCurrImageSrc(): string {
        return this.hasImage() ? environment.host + this.question.question_image : null;
    }

    protected isQuestionChange(changes: SimpleChanges) {
        const question: SimpleChange = changes.question;
        if (question && !question.firstChange) {
            const previousQuestion: Question = question.previousValue;
            const currQuestion: Question = question.currentValue;
            if (previousQuestion && currQuestion) {
                if (previousQuestion.id !== currQuestion.id) {
                    return true;
                }
            }
        }
        return false;
    }
}