import { AuthService } from '@/auth/auth.service';
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { ROUTES } from '@/core/constants/routes.constants';

export const authGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirigir a login si NO está autenticado
  return router.createUrlTree([`${ROUTES.AUTH_PATH}/${ROUTES.LOGIN}`]);
};
