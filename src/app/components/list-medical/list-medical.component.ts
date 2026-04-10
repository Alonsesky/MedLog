import { Component, inject, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { EvolutionService } from 'src/app/services/firebase/evolution.service';
import { Evolution } from 'src/app/shared/models/evolution.model';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../shared/service/toastService';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonCardSubtitle,
  IonInput,
  IonItem,
  IonTextarea,
  IonDatetime
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-list-medical',
  templateUrl: './list-medical.component.html',
  styleUrls: ['./list-medical.component.scss'],
  imports: [
    IonCardSubtitle,
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonInput,
    IonItem,
    IonTextarea,
    IonDatetime,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ListMedicalComponent  implements OnInit {

  private fb = inject(FormBuilder);
  private evolutionService = inject(EvolutionService);
  private toastService = inject(ToastService);
  evolutions: Evolution[] = [];
  editingId: string | null = null;
  isSaving = false;

  form = this.fb.group({
    emailPatient: ['', [Validators.required, Validators.email]],
    namePatient: ['', [Validators.required, Validators.minLength(3)]],
    nameProfessional: ['', [Validators.required, Validators.minLength(3)]],
    date: ['', Validators.required],
    evolution: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private auth: Auth
  ) {}

  async ngOnInit() {

    const user = await firstValueFrom(authState(this.auth));

    if (!user) return;

    this.evolutionService
      .getByUserId(user.uid)
      .subscribe(data => {
        this.evolutions = data;
      });

  }

  delete(id: string) {

    this.evolutionService.deleteById(id)
      .then(() => this.toastService.showToast('Eliminado exitosamente!'))
      .catch(err => this.toastService.showToast(`Error al eliminar ${err.message}`));

  }

  update(item: Evolution) {
    this.editingId = item.id ?? null;
    this.form.reset({
      emailPatient: item.emailPatient,
      namePatient: item.namePatient,
      nameProfessional: item.nameProfessional,
      date: item.date,
      evolution: item.evolution,
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.isSaving = false;
    this.form.reset();
  }

  async confirmUpdate(id: string) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    try {
      await this.evolutionService.UpdateById(id, this.form.getRawValue() as Partial<Evolution>);
      this.toastService.showToast('Actualizado exitosamente!');
      this.cancelEdit();

    } catch (err) {
      this.isSaving = false;
      this.toastService.showToast(`Error al actualizar: ${err}`);
    }

  }

}
