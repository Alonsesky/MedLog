import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonItem, IonButton, IonInput } from '@ionic/angular/standalone';

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

  public registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
    password: ['',Validators.required],
  });

  constructor() { }

  ngOnInit() {
  }

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
    }
  }

}
