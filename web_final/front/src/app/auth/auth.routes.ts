import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ROUTES } from '@/core/constants/routes.constants';
import { RegisterComponent } from './register/register.component';

export const authRoutes: Routes = [
    {path: ROUTES.LOGIN, component: LoginComponent},
    {path: ROUTES.REGISTER, component: RegisterComponent}
];
