import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

import { RoleService } from 'src/app/services/authorization/role.service';
import { UserRole } from 'src/app/shared/models/userRole.model';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const roleService = inject(RoleService);
  const router = inject(Router);
  const requiredRoles = (route.data['roles'] as UserRole[] | undefined) ?? [];

  if (requiredRoles.length === 0) {
    return router.createUrlTree(['/unauthorized']);
  }

  return roleService.hasRole$(requiredRoles).pipe(
    take(1),
    map((hasRole) => hasRole ? true : router.createUrlTree(['/unauthorized'])),
  );
};
