import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { Question } from 'app/datatypes/server/Question';
import { KeyboardService } from 'app/services/KeyboardService';

@Component({
    selector: 'app-test-question',
    templateUrl: './test-question.component.html',
    styleUrls: ['./test-question.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TestQuestionComponent implements AfterViewInit, OnDestroy {

    nativeInputElements: any[];

    @Input() question: Question;
    @Input() answered: boolean;
    @Output() onInputChange: EventEmitter<string[]>;
    @Output() onInputEnter: EventEmitter<void>;

    constructor(private elementRef: ElementRef,
        private keyboardService: KeyboardService) {
        this.answered = false;
        this.onInputChange = new EventEmitter();
        this.onInputEnter = new EventEmitter();
    }

    ngAfterViewInit(): void {
        const nativeInputElements = Array.from(this.elementRef.nativeElement.querySelectorAll('input'));
        if (nativeInputElements) {
            this.nativeInputElements = nativeInputElements;
            for (const input of this.nativeInputElements) {
                input.addEventListener('blur', this.changeInput.bind(this));
                input.addEventListener('keypress', this.enterKeyInput.bind(this));

            }
        }
    }

    private enterKeyInput(e: KeyboardEvent) {
        if (this.keyboardService.isEnter(e)) {
            // if not answered -> popup event and cancel bubble
            if (!this.answered) {
                e.cancelBubble = true;
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                this.onInputEnter.emit();
            }
        }
    }

    private changeInput() {
        if (this.nativeInputElements) {
            this.onInputChange.emit(this.nativeInputElements.map(v => v.value));
        }
    }

    ngOnDestroy(): void {
        if (this.nativeInputElements) {
            for (const input of this.nativeInputElements) {
                input.removeEventListener('blur', this.changeInput);
                input.removeEventListener('keypress', this.enterKeyInput);
            }
        }
    }

}
