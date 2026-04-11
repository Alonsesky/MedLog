import { Component, inject, OnInit } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonRow, IonCol, IonGrid, IonInput, IonItem, IonTextarea, IonDatetime } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { EvolutionService } from 'src/app/services/firebase/evolution.service';
import { Evolution } from 'src/app/shared/models/evolution.model';
import { ToastService } from 'src/app/shared/service/toastService';

@Component({
  selector: 'app-register-medical',
  templateUrl: './register-medical.component.html',
  styleUrls: ['./register-medical.component.scss'],
  standalone: true,
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
  private evolutionService = inject(EvolutionService);
  private auth = inject(Auth);
  private toastService = inject(ToastService);

  form =this.fb.group({
    emailPatient: ['', [Validators.required, Validators.email]],
    namePatient: ['', [Validators.required, Validators.minLength(3)]],
    nameProfessional: ['', [Validators.required, Validators.minLength(3)]],
    date: ['',Validators.required],
    evolution: ['', [Validators.required,Validators.minLength(3)]],
  });


  constructor(private router: Router) {}

  ngOnInit() {}

  async accept() {
    // Validar el formulario
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Obtener el usuario autenticado
    const user = await firstValueFrom(authState(this.auth));
    // Verificar si el usuario está autenticado
    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }
    // Preparar los datos para guardar
    const { date, evolution, namePatient, nameProfessional, emailPatient } =this.form.value;
    const normalizedEmailPatient = emailPatient?.trim();
    // Obtener el paciente por email
    const patient = await this.evolutionService.getPatientByEmail(normalizedEmailPatient!);
    // Crear el objeto de datos a guardar
    const data: Evolution = {
      date:date!,
      evolution:evolution!,
      namePatient: namePatient!,
      nameProfessional: nameProfessional!,
      emailPatient: normalizedEmailPatient!,
      patientId: patient.uid,
      userId: user.uid,
      createdAt: new Date(),
    };

   // Guardar la evolución en Firebase
    try {

      await this.evolutionService.saveEvolution(data);
      await this.toastService.showToast('Guardado correctamente');

      this.form.reset();

    } catch (error) {
      await this.toastService.showToast(`Error al guardar: ${error}`, 3000, 'top');
    }
  }

  cancel(){
    this.form.reset();
    this.router.navigate(['/home']);
  }

}
