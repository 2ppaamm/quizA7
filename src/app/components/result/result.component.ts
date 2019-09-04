import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from 'app/common/confirmation-modal/confirmation-modal.component';
import { QuizAnswerResponse } from 'app/datatypes/server/QuizAnswerResponse';
import { AuthService } from 'app/services/auth/auth.service';
import { QuizService } from 'app/services/QuizService';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

    result: QuizAnswerResponse;
    isDiagnosticTest: boolean;

    constructor(private quizService: QuizService,
        private authService: AuthService,
        private dialog: MatDialog,
        private router: Router) {
        this.isDiagnosticTest = false;
    }

    ngOnInit() {
        this.result = this.quizService.getResult();

        this.result = {
            code: 206,
            kudos: 4,
            maxile: 88.888889,
            message: "Diagnostic test completed",
            percentage: 44.44,
            score: 88.888889,
            test: 660
        };

        if (this.result) {
            this.isDiagnosticTest = this.result.message.startsWith('Diagnostic');
        } else {
            this.router.navigate(['/']);
        }
    }

    public startAgain() {
        /**
         * If diagnostic test is completed, 
            change the words to: “Do daily tests” instead of ‘Do again”. 
            
            Make sure it is diagnostic test. If not diagnostic test, the current screen is the same. 
         */
        this.result = null;
        this.router.navigate(['/']);
    }

    public finish() {

        this.dialog
            .open(ConfirmationModalComponent, {
                data: { id: 0, text: 'Are you sure you want to end the quiz?' }
            })
            .afterClosed()
            .subscribe(
                (event: Event) => {
                    if (event) {
                        this.authService.logout();
                        this.router.navigate(['/']);
                    }
                },
                error => {
                    console.error(error);
                }
            );
    }
}
