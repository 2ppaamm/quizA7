import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerCode } from 'app/datatypes/ServerCode';
import { AuthorizationService } from 'app/services/auth/AuthorizationService';
import { QuizService } from 'app/services/QuizService';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

    form: FormGroup;
    sending: boolean;
    errorMessage: string;

    constructor(fb: FormBuilder,
        private authorizationService: AuthorizationService,
        private quizService: QuizService,
        private router: Router) {
        this.form = this.createForm(fb);
        this.sending = false;
    }

    ngOnInit() { }

    private createForm(fb: FormBuilder): FormGroup {
        return fb.group({
            firstname: [null, Validators.required],
            lastname: [null, Validators.required],
            birthdate: [null, Validators.required],
            mastercode: [null, Validators.required]
        });
    }

    public sendMastercode() {
        const firstname = this.form.controls.firstname.value;
        const lastname = this.form.controls.lastname.value;
        const birthdate = this.form.controls.birthdate.value;
        const mastercode = this.form.controls.mastercode.value;

        this.errorMessage = '';
        this.sending = true;
        this.authorizationService.checkAuthorization(firstname, lastname, birthdate, mastercode)
            .subscribe(
                response => {
                    if (response.code == ServerCode.CODE_VERIFIED) {
                        this.authorizationService.notifyLogin()
                            .subscribe(
                                notifyLoginResponse => {
                                    if (notifyLoginResponse.code === ServerCode.CODE_VERIFIED) {
                                        // questions are retured, go to test
                                        this.quizService.initQuiz(notifyLoginResponse.test, notifyLoginResponse.questions);
                                        this.router.navigate(['test']);
                                    } else {
                                        this.sending = false;
                                        console.error(notifyLoginResponse);
                                    }
                                },
                                error => {
                                    this.sending = false;
                                    console.error(error);
                                });
                    } else {
                        this.sending = false;
                        alert(`Mastercode ${mastercode} is invalid`);
                    }
                },
                error => {
                    this.sending = false;
                    this.errorMessage = this.formatError(error);
                    console.error(error);
                }
            )
    }

    formatError(error: Error): string {
        const SERVER_MAILBOX_ERROR = 'Address in mailbox given [] does not comply with RFC';
        const GENERAL_ERROR_MESSAGE = 'Error authorizing code. Please contact administrator.';
        const MAILBOX_ERROR_MESSAGE = 'Error authorizing code. Address in mailbox is not correct. Please contact administrator.';

        if (error) {
            const customerError = (<any>error).error;
            if (customerError && customerError.message) {
                if (customerError.message.startWith(SERVER_MAILBOX_ERROR)) {
                    return MAILBOX_ERROR_MESSAGE;
                } else {
                    return GENERAL_ERROR_MESSAGE;
                }
            } else {
                return GENERAL_ERROR_MESSAGE;
            }
        } else {
            return GENERAL_ERROR_MESSAGE;
        }
    }
}