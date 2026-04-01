import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { AuthenticationService } from 'src/app/services/firebase/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonButton,
    IonItem,
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RegisterPage implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private router = inject(Router);

  public registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',Validators.required],
  });

  constructor() { }

  ngOnInit() {
  }

  async register(){
    if(this.registerForm.valid){
      try{
        const user = await this.authenticationService.createUser(this.registerForm.value.email!, this.registerForm.value.password!);

      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  }

  async logout() {
    try {
      await this.authenticationService.logout();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }

}
