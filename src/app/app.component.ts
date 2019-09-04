import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(auth: AuthService,
        private router: Router) {
        auth.handleAuthentication();
    }

    public isMathTextVisible() {
        return this.router.url == '/' || this.router.url == '/verify';
    }
}
