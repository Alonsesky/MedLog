import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonRow, IonCol, IonGrid, IonInput, IonItem, IonTextarea, IonDatetime } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register-medical',
  templateUrl: './register-medical.component.html',
  styleUrls: ['./register-medical.component.scss'],
  imports: [
    IonItem,
    IonInput,
    IonGrid,
    IonCol,
    IonRow,
    IonButton,
    ReactiveFormsModule,
    IonTextarea,
    IonDatetime]
})
export class RegisterMedicalComponent  implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  form =this.fb.group({
  emailPatient: ['', [Validators.required, Validators.email]],
  namePatient: ['', [Validators.required, Validators.minLength(3)]],
  nameProfessional: ['', [Validators.required, Validators.minLength(3)]],
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

  const { date, evolucion, namePatient, nameProfessional, emailPatient } =this.form.value;

  console.log('Nombre del paciente:', namePatient);
  console.log('Nombre del profesional:', nameProfessional);
  console.log('Fecha:', date);
  console.log('Evolución:', evolucion);
  console.log('Email del paciente:',emailPatient);

  // aquí llamas API / guardas en BD
  }

  cancel(){
    this.form.reset();
    this.router.navigate(['/home'])
  }

}
