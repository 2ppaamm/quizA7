import { Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { TestComponent } from './components/test/test.component';
import { VerifyComponent } from './components/verify/verify.component';
import { AuthenticatedGuardService } from './services/auth/AuthenticatedGuardService';

export const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'callback',
        component: CallbackComponent
    },
    {
        path: 'verify',
        component: VerifyComponent,
        canActivate: [AuthenticatedGuardService]
    },
    {
        path: 'test',
        component: TestComponent,
        canActivate: [AuthenticatedGuardService]
    },
    {
        path: 'result',
        component: ResultComponent,
        canActivate: [AuthenticatedGuardService]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
