import { Component, OnInit } from '@angular/core';
import { IonHeader, IonButton,IonMenu,IonToolbar,IonTitle, IonContent,IonButtons,IonMenuButton,IonImg, IonIcon, } from "@ionic/angular/standalone";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonHeader,IonButton,IonMenu,IonToolbar,IonTitle,IonButtons,IonMenuButton,IonImg],
})



export class NavbarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
