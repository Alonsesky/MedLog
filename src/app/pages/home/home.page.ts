import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { AuthenticationService } from 'src/app/services/firebase/authentication.service';
import { RoleService } from 'src/app/services/authorization/role.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    NgIf,
    RouterLink,
  ],
})
export class HomePage {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  private roleService = inject(RoleService);

  currentUser$ = this.authenticationService.currentUser$;
  isAdmin$ = this.roleService.hasRole$(['admin']);
  canAccessMedic$ = this.roleService.hasRole$(['admin', 'medic']);
  canAccessPatient$ = this.roleService.hasRole$(['admin', 'medic', 'patient']);

  async logout() {
    await this.authenticationService.logout();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
