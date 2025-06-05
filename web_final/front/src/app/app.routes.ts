import { Routes } from '@angular/router';
import { authRoutes } from '@/auth/auth.routes';
import { authGuard } from '@/core/guards/AuthGuard';
import { contactRoutes } from '@/contacts/contacts.routes';
import { ROUTES } from '@/core/constants/routes.constants';
import { Main } from '@/layouts/main/main';


export const appRoutes: Routes = [
  {
    path: ROUTES.AUTH_PATH,
    children: authRoutes // tus rutas de login, registro, etc.
  },
  {
    path: '',
    component: Main,
    canMatch: [authGuard], // protege esta ruta y sus hijos
    children: contactRoutes
  },
  { path: '**', redirectTo: '' }
];

