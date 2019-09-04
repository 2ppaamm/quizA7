import { EventEmitter, Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

@Injectable()
export class AuthService {

    private _idToken: string;
    private _accessToken: string;
    private _expiresAt: number;

    private isAuthenticating: boolean;
    public authenticated: EventEmitter<boolean> = new EventEmitter();

    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        redirectUri: AUTH_CONFIG.callbackURL,
        scope: 'openid email profile',
        audience: `https://${AUTH_CONFIG.domain}/api/v2/`,
    });

    constructor() {
        this.isAuthenticating = false;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    get idToken(): string {
        return this._idToken;
    }

    public login(): void {
        this.auth0.authorize();
    }

    public notifyAuth(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // if is authenticating wait for it
            if (this.isAuthenticating) {
                this.authenticated.subscribe(
                    (auth: boolean) => { resolve(auth); },
                    (err: Error) => { reject(err); }
                );
            } else {
                resolve(this.isAuthenticated());
            }
        });
    }

    public handleAuthentication() {
        if (!this.isAuthenticated()) {
            this.isAuthenticating = true;
            this.auth0.parseHash({ hash: window.location.hash }, (err, authResult) => {
                if (err) {
                    this.isAuthenticating = false;
                    console.log(err);
                    this.authenticated.next(false);
                } else if (authResult && authResult.accessToken) {
                    this.isAuthenticating = false;
                    this.localLogin(authResult);
                    this.authenticated.next(true);
                } else {
                    this.isAuthenticating = false;
                    this.authenticated.next(false);
                }
            });
        }
    }

    private localLogin(authResult): void {
        const expiresAt = (authResult.expiresIn * 1000) + Date.now();
        this._accessToken = authResult.accessToken;
        this._idToken = authResult.idToken;
        this._expiresAt = expiresAt;

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('idToken', authResult.idToken);
        localStorage.setItem('expiresAt', <any>expiresAt);
    }

    public isAuthenticated(): boolean {
        if (!this._accessToken) {
            this._accessToken = localStorage.getItem('access_token');
        }
        if (!this._idToken) {
            this._idToken = localStorage.getItem('idToken');
        }
        if (!this._expiresAt) {
            this._expiresAt = parseInt(localStorage.getItem('expiresAt'));
        }
        return this._accessToken && Date.now() < this._expiresAt;
    }

    public logout() {
        this._accessToken = null;
        this._idToken = null;
        this._expiresAt = null;

        localStorage.removeItem('access_token');
        localStorage.removeItem('idToken');
        localStorage.removeItem('expiresAt');
    }
}
