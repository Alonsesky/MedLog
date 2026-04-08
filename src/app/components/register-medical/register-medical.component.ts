import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonRow, IonCol, IonGrid, IonInput, IonItem, IonTextarea } from "@ionic/angular/standalone";

@Component({
  selector: 'app-register-medical',
  templateUrl: './register-medical.component.html',
  styleUrls: ['./register-medical.component.scss'],
  imports: [IonItem, IonInput, IonGrid, IonCol, IonRow, IonButton, ReactiveFormsModule, IonTextarea]
})
export class RegisterMedicalComponent  implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  form =this.fb.group({
  date: ['',Validators.required],
  evolucion: ['', [Validators.required,Validators.minLength(3)]],
  });


  constructor() { }

  ngOnInit() {}

  accept() {
  if (this.form.invalid) {
  this.form.markAllAsTouched();
  return;
    }

  const { date, evolucion } =this.form.value;

  console.log('Fecha:', date);
  console.log('Evolución:', evolucion);

  // aquí llamas API / guardas en BD
  }

  cancel(){
    this.form.reset();
    this.router.navigate(['/home'])
  }

}
