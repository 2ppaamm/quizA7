import { HttpHeaders } from '@angular/common/http';

export class BaseService {

    protected createAuthHeader(token: string) {
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
}