import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonTabComponent } from '../../shared/components/ion-tab/ion-tab/ion-tab.component';
@Component({
  selector: 'app-medic',
  templateUrl: './medic.page.html',
  styleUrls: ['./medic.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonTabComponent]
})
export class MedicPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
