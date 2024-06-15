import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonModal } from '@ionic/angular'; 
import { ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonList, IonCardContent, IonRadioGroup, IonItem, IonLabel, IonRadio, IonFooter, IonButtons, IonButton, IonIcon, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { TimeInterface } from 'src/app/interfaces/interfaceTime';
import { Dados } from 'src/app/services/dados/dados.service';
import { TimeService } from 'src/app/services/time/time.service';
import { CommonModule } from '@angular/common';
import { interfaceUsuario } from 'src/app/interfaces/interfaceUsuario';
@Component({
  selector: 'app-modal-detalhes',
  templateUrl: './modal-detalhes.component.html',
  styleUrls: ['./modal-detalhes.component.scss'],
  standalone: true,
  imports: [IonSelectOption,IonSelect,IonButtons,IonFooter,IonRadio,IonLabel,IonItem,IonRadioGroup,IonCardContent,IonList,IonCardTitle,IonCardHeader,IonCard,IonContent,IonTitle,IonToolbar,IonHeader,IonButton,IonIcon,FormsModule,CommonModule
  ],
})
export class ModalDetalhesComponent  implements OnInit {

  @ViewChild(IonModal)
  modal!: IonModal;
  times: TimeInterface[]=[];
  usuarios: any;
  usuarioSelecionado: interfaceUsuario | undefined;
  @Input() time!: TimeInterface; 
  

  async ngOnInit() {
    this.usuarios = await this.dados.PegarTodosUsuarios();
    this.carregarTimes();
  }

  constructor(private modalController: ModalController, private timesService: TimeService,private dados: Dados) {}

  carregarTimes(){
    this.timesService.PegarTimes().then((resultado: any) => {
    this.times = resultado;
    });
}
  buscarUsuarioSelecionado(nome: string) {
    this.usuarioSelecionado = this.usuarios.find((usuario: interfaceUsuario) => usuario.nome === nome);
  }

  fecharModal() {
    this.modalController.dismiss();
  }



}
