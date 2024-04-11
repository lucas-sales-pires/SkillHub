import { Component, OnInit } from '@angular/core';
import { IonHeader, IonButton,IonMenu,IonToolbar,IonTitle, IonContent,IonButtons,IonMenuButton,IonImg, IonIcon, IonSearchbar, IonItem, IonInput, IonLabel, IonGrid, IonRow, IonCol, IonList } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { search,personCircleOutline,personAddOutline,tabletLandscapeOutline,homeOutline,trophyOutline,settingsOutline,helpOutline,personOutline } from 'ionicons/icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonList, IonCol, IonRow, IonGrid, IonLabel, IonInput, IonItem, IonSearchbar, IonIcon, IonContent, IonHeader,IonButton,IonMenu,IonToolbar,IonTitle,IonButtons,IonMenuButton,IonImg],
})



export class NavbarComponent  implements OnInit {

  constructor() {
    
    addIcons({ search,personCircleOutline,personAddOutline, tabletLandscapeOutline,homeOutline,trophyOutline,settingsOutline,helpOutline,personOutline });
    
   }

  ngOnInit() {}

}
