import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton } from '@ionic/angular/standalone';
import { IonTabComponent } from '../../shared/components/ion-tab/ion-tab.component';
import { RegisterMedicalComponent } from "src/app/components/register-medical/register-medical.component";
import { ListMedicalComponent } from 'src/app/components/list-medical/list-medical.component';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { AuthenticationService } from '../../services/firebase/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-medic',
  templateUrl: './medic.page.html',
  styleUrls: ['./medic.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTabComponent, RegisterMedicalComponent, ListMedicalComponent]
})
export class MedicPage implements OnInit {

  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  showList = true;

  constructor() {
    addIcons({
      logOutOutline,
    });
  }

  ngOnInit() {
  }

  changeView(show: boolean){
  this.showList = show;
  }

  async logOut(){
    await this.authenticationService.logout();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
