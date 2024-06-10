import { Component, OnInit } from '@angular/core';

import { ChatService } from 'src/app/services/chat/chat.service';
import { Dados } from 'src/app/services/dados/dados.service';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { IonContent, IonList, IonLabel, IonItem, IonSpinner, IonNav, IonItemSliding, IonItemOption, IonItemOptions, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { InterfaceMensagem } from 'src/app/interfaces/interfaceMensagem';


@Component({
    selector: 'app-mensagem-servidor',
    templateUrl: './mensagem-servidor.page.html',
    styleUrls: ['./mensagem-servidor.page.scss'],
    standalone: true,
    providers: [AuthService, ChatService, Dados],
    imports: [IonIcon, IonItemOptions, IonItemOption, IonItemSliding, IonNav, IonSpinner, IonItem, CommonModule, IonContent, IonList, IonLabel, NavbarComponent]
})
export class MensagemServidorPage implements OnInit {
  usuarioAtual: any; 
  usuarios: any; 
  mensagens: InterfaceMensagem[] = []; 
  carregando = true;
  

  constructor(private chatService: ChatService, private service: AuthService, private dados: Dados,private autenticado:AuthService,private controller:AlertController) {
    addIcons({
      trash: trash,
      });
    
  }

  async ngOnInit() {
    this.usuarioAtual = await this.service.buscarUsuario();
    this.autenticado.autenticado.set(true);

    this.chatService.usuarioBuscarMensagensAdm(this.usuarioAtual.nome).forEach(mensagens => {
      this.mensagens = mensagens;
      this.carregando = false;
      
    })
    this.mensagens = this.mensagens.filter(m => m.usuario === this.usuarioAtual.nome);
    
    this.usuarios = await this.dados.PegarTodosUsuarios();
  }

  async confirmarExclusao(id: string){
    console.log("tentei")
    const confirmar = await this.controller.create({
      header: 'Confirmar Saida',
      message: `Deseja esta mensagem ?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Excluir', handler: () => this.excluirMensagem(id) }
      ]
  });
  await confirmar.present();
  }  

  async excluirMensagem(id: string) {

    this.mensagens = this.mensagens.filter(m => m._id !== id);
    this.chatService.excluirMensagemAdministrativa(id).subscribe();
    console.log("Mensagem excluida com sucesso!")
  }
}

