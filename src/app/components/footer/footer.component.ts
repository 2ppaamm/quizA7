import { Component, OnInit } from '@angular/core';
import { QuestionFeatures } from 'app/datatypes/QuestionFeatures';
import { QuizService } from 'app/services/QuizService';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    calculatorAllowed: boolean;
    constructor(private quizService: QuizService) {
        this.calculatorAllowed = false;
    }

    ngOnInit() {
        this.quizService.currentQuestionChanged.subscribe(
            (value: QuestionFeatures) => {
                this.calculatorAllowed = value.calculatorAllowed;
            },
            error => {
                console.error(error);
            }
        );
    }

    toggle(id: string) {
        (<any>window).toggle(id);
    }
}
