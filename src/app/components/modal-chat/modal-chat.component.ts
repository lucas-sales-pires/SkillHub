import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.component.html',
  styleUrls: ['./modal-chat.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ModalChatComponent {
  @Input() usuarioSelecionado: any; 
  novaMensagem: string = ''; 

  constructor( private chat:ChatService,private modalController: ModalController) {}

  enviarMensagem() {
    try{
      const resposta  = this.chat.enviarMensagemAdministrativa(this.usuarioSelecionado.nome, this.novaMensagem);
      console.log('Enviando mensagem...');
      this.novaMensagem = '';
    }
    catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }

  }
  
  fecharModal() {
    this.modalController.dismiss();
  }
}
