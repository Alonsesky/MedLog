import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon
} from '@ionic/angular/standalone';

import { AuthenticationService } from '../../services/firebase/authentication.service';
import { logoGoogle, mailOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { LoginGoogleComponent } from "src/app/components/auth/login-google/login-google.component";
import { LoginEmailComponent } from "src/app/components/auth/login-email/login-email.component";

type ProviderType = 'google' | 'email' | null;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCardContent, IonCard,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginGoogleComponent, LoginEmailComponent],
})
export class LoginPage implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private formBuilder = inject(FormBuilder);

  public formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    addIcons({ logoGoogle, mailOutline });

    this.authenticationService.authState.subscribe((user:any) => {
      if (user) {
        console.log('User is logged in:', user);
      } else {
        console.log('User is not logged in');
      }
    });
  }

  ngOnInit() {}



  selectedProvider: ProviderType = null;



  selectProvider(provider: ProviderType): void {
    this.selectedProvider = provider;
  }
}

