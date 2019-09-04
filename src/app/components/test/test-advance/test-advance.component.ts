import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-test-advance',
    templateUrl: './test-advance.component.html',
    styleUrls: ['./test-advance.component.scss']
})
export class TestAdvanceComponent {

    // types captured in a variable
    Arr = Array;

    @Input() count: number;
    @Input() current: number;
    @Input() successAnswers: boolean[];
}