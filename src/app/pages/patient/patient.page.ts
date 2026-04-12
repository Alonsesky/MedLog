import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCardSubtitle, IonIcon, IonButtons, IonButton } from '@ionic/angular/standalone';
import { Auth, authState, User } from '@angular/fire/auth';
import { EvolutionService } from '../../services/firebase/evolution.service';
import { Evolution } from 'src/app/shared/models/evolution.model';
import { Observable, filter, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/firebase/authentication.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';



@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonIcon, IonCardSubtitle, IonCol, IonRow, IonGrid,  IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PatientPage implements OnInit {

  private auth = inject(Auth);
  private evolutionService = inject(EvolutionService);
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);

  evolutions$: Observable<Evolution[]> = authState(this.auth).pipe(
    filter((user): user is User => !!user),
    switchMap((user) => this.evolutionService.getByPatientId(user.uid)),
  );

  constructor() {
    addIcons({
      logOutOutline,
    });
  }

  ngOnInit() {}

  async logOut(){
    await this.authenticationService.logout();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
