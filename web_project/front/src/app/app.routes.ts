import { Routes } from '@angular/router';
import { authRoutes } from '@/auth/auth.routes';
import { publicRoutes } from '@/public/public.routes';

export const appRoutes: Routes = [
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: '',
    children: publicRoutes
  },
//   {
//     path: 'admin',
//     loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)
//   },
  { path: '**', redirectTo: '' }
];
