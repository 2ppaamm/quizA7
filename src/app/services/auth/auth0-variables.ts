import { environment } from 'environments/environment';

interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
    // pamelalim.auth0.com keys
    clientID: 'eVJv6UFM9GVdukBWiURczRCxmb6iaUYG',
    domain: 'pamelalim.auth0.com',
    callbackURL: environment.callbackURL
};
