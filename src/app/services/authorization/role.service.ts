import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AuthenticationService } from '../firebase/authentication.service';
import { Permission, ROLE_PERMISSIONS } from 'src/app/shared/models/permission.model';
import { UserRole } from 'src/app/shared/models/userRole.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private authenticationService = inject(AuthenticationService);

  userRole$: Observable<UserRole | null> = this.authenticationService.currentUser$.pipe(
    map((user) => user?.role ?? null),
  );

  hasPermission$(permission: Permission): Observable<boolean> {
    return this.userRole$.pipe(
      map((role) => {
        if (!role) {
          return false;
        }

        return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
      }),
    );
  }

  hasRole$(requiredRoles: UserRole[]): Observable<boolean> {
    return this.userRole$.pipe(
      map((role) => !!role && requiredRoles.includes(role)),
    );
  }
}
