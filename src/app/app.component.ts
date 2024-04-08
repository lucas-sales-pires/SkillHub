import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {  inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { Dados } from './services/dados/dados.service';
import { AuthService } from './services/autenticacao/auth.service';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);


  constructor() {}

  ngOnInit(): void {

  }

}
