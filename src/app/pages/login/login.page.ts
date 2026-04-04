import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logoGoogle, mailOutline } from 'ionicons/icons';

import { LoginEmailComponent } from 'src/app/components/auth/login-email/login-email.component';
import { LoginGoogleComponent } from 'src/app/components/auth/login-google/login-google.component';
import { AuthenticationService } from '../../services/firebase/authentication.service';
import { UserProfileService } from '../../services/firebase/user-profile.service';

type ProviderType = 'google' | 'email' | null;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonCardContent,
    IonCard,
    IonButton,
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginGoogleComponent,
    LoginEmailComponent,
  ],
})


export class LoginPage implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  private userProfileService = inject(UserProfileService);

  selectedProvider: ProviderType = null;

  constructor() {
    addIcons({ logoGoogle, mailOutline });

    this.authenticationService.authState.subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }
    });
  }

  ngOnInit() {}

  selectProvider(provider: ProviderType): void {
    this.selectedProvider = provider;
  }

  async loginGoogle() {
    try {
      const result = await this.authenticationService.loginWithGoogle();

      const profile = this.userProfileService.mapUser(result.user);

      await this.userProfileService.saveUserProfile(profile);

      console.log('Login Google correcto:', result.user);
      await this.router.navigateByUrl('/home', { replaceUrl: true });

    } catch (error) {
      console.error('Error en login con Google:', error);
    }
  }
}
