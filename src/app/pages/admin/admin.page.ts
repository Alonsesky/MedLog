import { Component } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, RouterLink],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Panel Admin</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p>Esta ruta solo permite el rol admin.</p>
      <ion-button routerLink="/home">Volver a home</ion-button>
    </ion-content>
  `,
})
export class AdminPage {}
