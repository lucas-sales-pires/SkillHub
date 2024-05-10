import { Component, effect, OnInit, signal, Signal } from '@angular/core';
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
  peopleOutline
} from 'ionicons/icons';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { Dados } from 'src/app/services/dados/dados.service';

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
  email:any;
  adm = signal(false);
  usuario:any;
  constructor(private autenticacao: AuthService,private dados: Dados) {
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

  async administrador(){
    this.usuario = await this.autenticacao.buscarUsuario();
    this.email = this.usuario.email;
    this.dados.Administrador(this.email).then((res)=>{
      this.adm.set(res);
    }
    )
  }

  

  ngOnInit() {
    if(this.autenticado){
    this.administrador();
    }
  }

  deslogar(){
    this.autenticacao.deslogar();
    this.adm.set(this.dados.adm());
  }
}
