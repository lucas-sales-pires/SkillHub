import { Component, effect, OnInit } from '@angular/core';
import {
  IonHeader,
  IonButton,
  IonMenu,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonImg,
  IonIcon,
  IonSearchbar,
  IonItem,
  IonInput,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  search,
  personCircleOutline,
  personAddOutline,
  tabletLandscapeOutline,
  homeOutline,
  trophyOutline,
  settingsOutline,
  helpOutline,
  personOutline,
  informationCircleOutline,
  arrowUndoOutline,
} from 'ionicons/icons';
import { AuthService } from 'src/app/services/autenticacao/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonCol,
    IonRow,
    IonGrid,
    IonLabel,
    IonInput,
    IonItem,
    IonSearchbar,
    IonIcon,
    IonContent,
    IonHeader,
    IonButton,
    IonMenu,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonImg,
    
  ],
})
export class NavbarComponent implements OnInit {
  autenticado: boolean = false;

  constructor(private autenticacao: AuthService) {
    effect(() => {
      this.autenticado = this.autenticacao.autenticado();
    });

    addIcons({
      search,
      personCircleOutline,
      personAddOutline,
      tabletLandscapeOutline,
      homeOutline,
      trophyOutline,
      settingsOutline,
      helpOutline,
      personOutline,
      informationCircleOutline,
      arrowUndoOutline,
    });
  }

  ngOnInit() {}

  deslogar(){
    this.autenticacao.deslogar();
  }
}
