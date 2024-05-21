import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonModal } from '@ionic/angular'; 
import { ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonList, IonCardContent, IonRadioGroup, IonItem, IonLabel, IonRadio, IonFooter, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { TimeInterface } from 'src/app/interfaces/interfaceTime';
import { TimeService } from 'src/app/services/time/time.service';

@Component({
  selector: 'app-modal-detalhes',
  templateUrl: './modal-detalhes.component.html',
  styleUrls: ['./modal-detalhes.component.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonFooter,
    IonRadio,
    IonLabel,
    IonItem,
    IonRadioGroup,
    IonCardContent,
    IonList,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonButton,
    IonIcon,
    FormsModule,
  ],
})
export class ModalDetalhesComponent  implements OnInit {

  @ViewChild(IonModal)
  modal!: IonModal;
  times: TimeInterface[]=[];
  @Input() time!: TimeInterface; 

  constructor(private modalController: ModalController, private timesService: TimeService) {}

  carregarTimes(){
    this.timesService.PegarTimes().then((resultado: any) => {
    this.times = resultado;
    console.log(resultado)
    });
}


  fecharModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.carregarTimes();
  }

}
