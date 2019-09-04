import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizAnswer } from 'app/datatypes/server/QuizAnswer';
import { QuizAnswerResponse } from 'app/datatypes/server/QuizAnswerResponse';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { BaseService } from './BaseService';

@Injectable()
export class AnswersService extends BaseService {

    private ANSWER_URL = '/test/answers';

    constructor(private http: HttpClient, private authService: AuthService) {
        super();
    }

    /**
     * * Send anwers to the server
     * when a student finishes 5 questions, system send the answers to the api
     */
    sendAnswers(answers: QuizAnswer): Observable<QuizAnswerResponse> {
        return this.http
            .post<QuizAnswerResponse>(
                environment.host + this.ANSWER_URL, answers,
                { headers: this.createAuthHeader(this.authService.idToken) });
    }
}