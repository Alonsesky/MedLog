import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonTabComponent } from '../../shared/components/ion-tab/ion-tab.component';
import { RegisterMedicalComponent } from "src/app/components/register-medical/register-medical.component";
import { ListMedicalComponent } from 'src/app/components/list-medical/list-medical.component';
@Component({
  selector: 'app-medic',
  templateUrl: './medic.page.html',
  styleUrls: ['./medic.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTabComponent, RegisterMedicalComponent, ListMedicalComponent]
})
export class MedicPage implements OnInit {

  showList = true;

  constructor() { }

  ngOnInit() {
  }

  changeView(show: boolean){
  this.showList = show;
  }

}
