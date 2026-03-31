import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonItem, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem,
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RegisterPage implements OnInit {

  private formBuilder: FormBuilder = new FormBuilder();

  public registerForm = this.formBuilder.group({
    email: ['',Validators.required, Validators.email],
    password: ['',Validators.required],
  });

  constructor() { }

  ngOnInit() {
  }

  register(){

  }

}
