import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {  inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';




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
