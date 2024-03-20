import { Component, OnInit } from '@angular/core';
import { IonHeader, IonButton,IonMenu,IonToolbar,IonTitle, IonContent,IonButtons,IonMenuButton,IonImg, IonIcon, IonSearchbar, IonItem, IonInput, IonLabel } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { search } from 'ionicons/icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonLabel, IonInput, IonItem, IonSearchbar, IonIcon, IonContent, IonHeader,IonButton,IonMenu,IonToolbar,IonTitle,IonButtons,IonMenuButton,IonImg],
})



export class NavbarComponent  implements OnInit {

  constructor() {
    
    addIcons({ search });
    
   }

  ngOnInit() {}

}
