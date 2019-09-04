import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticatedGuardService implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(): boolean {
        const isAuth = this.authService.isAuthenticated();
        if (!isAuth) {
            this.router.navigate(['/']);
        }
        return isAuth;
    }
}