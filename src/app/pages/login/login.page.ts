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
import { Router } from '@angular/router';

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
    LoginGoogleComponent, LoginEmailComponent],
})
export class LoginPage implements OnInit {

  private authenticationService = inject(AuthenticationService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  public formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    // Iconos de proveedores de autenticación
    addIcons({ logoGoogle, mailOutline });
    // Suscripción al estado de autenticación
    this.authenticationService.authState.subscribe((user:any) => {
      if (user) {
        this.router.navigateByUrl('/register', { replaceUrl: true });
      }
    });

    // Obtener el usuario actual
    const user = this.authenticationService.getCurrentUser();


  }

  ngOnInit() {}


  // Variable para almacenar el proveedor de autenticación seleccionado
  selectedProvider: ProviderType = null;
  // Seleccion del proveedor de autenticación
  selectProvider(provider: ProviderType): void {
    this.selectedProvider = provider;

    if (this.selectedProvider === 'google') {
      console.log('Google seleccionado');
    } else if (this.selectedProvider === 'email') {
      console.log('Email seleccionado');
    }
  }

  async loginGoogle(){
    try {
      const result = await this.authenticationService.loginWithGoogle();
      console.log('Login Google correcto:', result.user);
      await this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error) {
      console.error('Error en login con Google:', error);
    }
  }

}

