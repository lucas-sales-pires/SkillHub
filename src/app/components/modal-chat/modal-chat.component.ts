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

  constructor(private chatService: ChatService, private modalController: ModalController) {}

  enviarMensagem() {
    if (!this.usuarioSelecionado || !this.novaMensagem) return;

    this.chatService.enviarMensagemAdministrativa(this.usuarioSelecionado.nome, this.novaMensagem).subscribe(() => {
      console.log('Mensagem enviada com sucesso!');
      this.fecharModal();
    });
  }

  fecharModal() {
    this.modalController.dismiss();
  }
}
