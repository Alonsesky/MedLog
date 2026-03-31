import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { AuthenticationService } from '../../services/firebase/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  public formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',Validators.required,Validators.minLength(6)]
  });

  constructor() {
    this.authenticationService.authState.subscribe((user: any) => {
      if (user) {
        console.log('User is logged in:', user);
      } else {
        console.log('User is not logged in');
      }
    });
  }

  ngOnInit() {
  }


  async login() {
   await this.authenticationService.login(this.formLogin.value.email!, this.formLogin.value.password!);

  }

  logout(){
    this.authenticationService.logout();
  }
}
