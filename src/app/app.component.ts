import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FirestoreService } from './services/firebase/firestore-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  firestore: FirestoreService = inject(FirestoreService);
  constructor() {
    console.log('fire');

    this.firestore.addUser();
  }


}
