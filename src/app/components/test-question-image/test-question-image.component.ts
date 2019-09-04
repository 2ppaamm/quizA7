import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-test-question-image',
    templateUrl: './test-question-image.component.html',
    styleUrls: ['./test-question-image.component.scss']
})
export class TestQuestionImageComponent implements OnChanges {

    imgLoading: boolean;
    @Input() questionImageSrc: string;

    constructor() {
        this.imgLoading = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        const questionImageSrc: SimpleChange = changes.questionImageSrc;
        if (questionImageSrc && !questionImageSrc.firstChange) {
            const previousQuestionImageSrc: string = questionImageSrc.previousValue;
            const currQuestionImageSrc: string = questionImageSrc.currentValue;
            if (previousQuestionImageSrc && currQuestionImageSrc &&
                previousQuestionImageSrc !== currQuestionImageSrc) {
                this.imgLoading = true;
            }
        }
    }

    public imageLoaded() {
        this.imgLoading = false;
    }
}
