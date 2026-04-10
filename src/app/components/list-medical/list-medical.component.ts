import { Component, inject, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { EvolutionService } from 'src/app/services/firebase/evolution.service';
import { Evolution } from 'src/app/shared/models/evolution.model';
import { CommonModule } from '@angular/common';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonCardSubtitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-list-medical',
  templateUrl: './list-medical.component.html',
  styleUrls: ['./list-medical.component.scss'],
  imports: [IonCardSubtitle, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonGrid, CommonModule]
})
export class ListMedicalComponent  implements OnInit {

  private evolutionService = inject(EvolutionService);
  evolutions: Evolution[] = [];

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
      .then(() => console.log('Eliminado'))
      .catch(err => console.error(err));

  }

  update(id: string) {

  }

}
