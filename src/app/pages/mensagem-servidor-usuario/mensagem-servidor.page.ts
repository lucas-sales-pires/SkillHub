import { Component, OnInit } from '@angular/core';

import { ChatService } from 'src/app/services/chat/chat.service';
import { Dados } from 'src/app/services/dados/dados.service';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { IonContent, IonList, IonLabel, IonItem, IonSpinner, IonNav, IonItemSliding, IonItemOption, IonItemOptions, IonIcon, IonTextarea, IonButton, IonInput } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { InterfaceMensagem } from 'src/app/interfaces/interfaceMensagem';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
    selector: 'app-mensagem-servidor',
    templateUrl: './mensagem-servidor.page.html',
    styleUrls: ['./mensagem-servidor.page.scss'],
    standalone: true,
    providers: [AuthService, ChatService, Dados],
    imports: [IonInput, IonButton, IonTextarea, IonIcon, IonItemOptions, IonItemOption, IonItemSliding, IonNav, IonSpinner, IonItem, CommonModule, IonContent, IonList, IonLabel, NavbarComponent,FormsModule]
})
export class MensagemServidorPage implements OnInit {
  usuarioAtual: any; 
  usuarios: any; 
  mensagens: InterfaceMensagem[] = []; 
  carregando = true;

  

  constructor(private chatService: ChatService, private service: AuthService, private dados: Dados,private autenticado:AuthService,private controller:AlertController,private toastController:ToastController) {
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
    this.mostrarToast(true,"Mensagem excluida com sucesso!")
  }
  async mostrarToast(sucesso: boolean,msg:string) {
    const toast = await this.toastController.create({
      message: sucesso ? msg : msg,
      duration: 2000,
      color: sucesso ? 'success' : 'danger',
      position: 'top',
      icon: sucesso ? 'checkmark-circle-outline' : 'close-circle-outline', 
    });
    toast.present();
  }
  
  

  async enviarMensagem(mensagem: any) {
    if (mensagem === '') return;
    let resposta = this.chatService.usuarioEnviarMensagem(this.usuarioAtual.nome,mensagem.value)
    if(resposta){
      this.mostrarToast(true,'Mensagem enviada com sucesso!');
    }
    else{
      this.mostrarToast(false, 'Erro ao enviar mensagem!');
    }

    mensagem = '';


  }
}

