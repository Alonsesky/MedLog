import { Component, OnInit } from '@angular/core';
import { IonIcon, IonFabButton, IonFabList, IonFab } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { add, addOutline, createOutline, listOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ion-tab',
  templateUrl: './ion-tab.component.html',
  styleUrls: ['./ion-tab.component.scss'],
  imports: [IonFab, IonFabList, IonFabButton,IonIcon],
})
export class IonTabComponent  implements OnInit {

  constructor() {
     addIcons({ add, addOutline, listOutline});
   }

  ngOnInit() {}

}
