import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@/core/services/AuthService';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ROUTES } from '@/core/constants/routes.constants';
import { STATUS_CODES } from '../constants/api.constants';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  const authReq = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === STATUS_CODES.UNAUTHORIZED) {
        authService.logout();
        router.navigate([`${ROUTES.AUTH_PATH}/${ROUTES.LOGIN}`]);
      }
      return throwError(() => err);
    })
  );
};
