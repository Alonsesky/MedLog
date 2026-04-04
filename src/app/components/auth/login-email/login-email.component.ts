import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonInput,
  IonItem,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthenticationService } from 'src/app/services/firebase/authentication.service';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonItem,
    IonInput,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginEmailComponent implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  public formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {}

  async login() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    try {
      const email = this.formLogin.value.email ?? '';
      const password = this.formLogin.value.password ?? '';
      await this.authenticationService.login(email, password);

      await this.router.navigateByUrl('/home', { replaceUrl: true });
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
