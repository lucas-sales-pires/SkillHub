import { Component, OnInit, effect } from '@angular/core';
import { IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonHeader, IonImg, IonButtons, IonTitle,IonMenu,IonMenuButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { arrowUndoOutline, helpOutline, homeOutline, informationCircleOutline, peopleOutline, personAddOutline, personCircleOutline, personOutline, search, settingsOutline, tabletLandscapeOutline, trophyOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/autenticacao/auth.service';

@Component({
  selector: 'app-navbar-adm',
  templateUrl: './navbar-adm.component.html',
  styleUrls: ['./navbar-adm.component.scss'],
  standalone: true,
  imports: [IonTitle, IonButtons, IonImg, IonHeader, IonIcon, IonLabel, IonItem, IonToolbar, IonList,IonMenu,IonMenuButton]
})
export class NavbarADMComponent  implements OnInit {
  autenticado = false;

  constructor(private autenticacao:AuthService) {
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
      peopleOutline
    });
   }
   deslogar(){
    this.autenticacao.deslogar();
  }

  ngOnInit() {}

}
