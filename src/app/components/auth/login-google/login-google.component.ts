import { Component, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss'],
  standalone: true,
  imports: [IonButton],
})
export class LoginGoogleComponent implements OnInit {
  ngOnInit() {}
}
