import { Component } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, RouterLink],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Acceso denegado</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p>No tienes permisos para acceder a esta ruta.</p>
      <ion-button routerLink="/home">Ir a home</ion-button>
    </ion-content>
  `,
})
export class UnauthorizedPage {}
