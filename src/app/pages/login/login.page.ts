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
  IonItem,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { AuthenticationService } from '../../services/firebase/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonItem,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private formBuilder = inject(FormBuilder);

  public formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    this.authenticationService.authState.subscribe((user:any) => {
      if (user) {
        console.log('User is logged in:', user);
      } else {
        console.log('User is not logged in');
      }
    });
  }

  ngOnInit() {}

  async login() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    try {
      const email = this.formLogin.value.email ?? '';
      const password = this.formLogin.value.password ?? '';

      const userCredential = await this.authenticationService.login(email, password);
      console.log('Login correcto:', userCredential.user);
    } catch (error) {
      console.error('Error en login:', error);
    }
  }

  async logout() {
    try {
      await this.authenticationService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }
}
