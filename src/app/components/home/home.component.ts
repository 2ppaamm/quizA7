import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerCode } from 'app/datatypes/ServerCode';
import { AuthorizationService } from 'app/services/auth/AuthorizationService';
import { QuizService } from 'app/services/QuizService';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    loading: boolean;
    isLoginIn: boolean;

    constructor(public auth: AuthService,
        private authorizationService: AuthorizationService,
        private quizService: QuizService,
        private router: Router) {
        this.loading = true;
    }

    public get isAuthenticated(): boolean {
        return this.auth.isAuthenticated();
    }

    ngOnInit() {
        this.auth.notifyAuth()
            .then(auth => {
                if (auth) {
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
                                    this.router.navigate(['test']);
                                }
                            },
                            error => {
                                this.loading = false;
                                console.error(error);
                            });
                } else {
                    this.loading = false;
                }
            })
            .catch(err => {
                this.loading = false;
                console.log(err);
            });
    }

    login() {
        this.isLoginIn = true;
        this.auth.login();
    }
}