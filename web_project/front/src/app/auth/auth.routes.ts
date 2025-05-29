import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ROUTES } from '@/core/constants/routes.constants';

export const authRoutes: Routes = [
    {path: ROUTES.LOGIN, component: LoginComponent}
];
