import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Dados } from 'src/app/services/dados/dados.service';
import { addIcons } from 'ionicons';
import { send,personCircleOutline,closeOutline } from 'ionicons/icons';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.component.html',
  styleUrls: ['./modal-chat.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ModalChatComponent implements OnInit {
  @Input() usuarioSelecionado: any; 
  novaMensagem: string = ''; 
  foto:any ;
  usuarios :any ;

  constructor( private chat:ChatService,private modalController: ModalController, private buscar:Dados, private toastController: ToastController) {
    addIcons({
      send: send,
      personCircleOutline: personCircleOutline,
      closeOutline: closeOutline,
    });
  }

  async ngOnInit() {
    
      this.usuarios = await this.buscar.PegarTodosUsuarios();
      this.foto = this.usuarioSelecionado.foto;
      
    
    
  }

  async enviarMensagem() {
    try{
      const resposta  = this.chat.enviarMensagemAdministrativa(this.usuarioSelecionado.nome, this.novaMensagem);
      console.log('Enviando mensagem...');
      this.novaMensagem = '';
      const toast = await this.toastController.create({
        message: 'Mensagem enviada!',
        duration: 2000, 
       position: "middle", 
        color: 'success' 
      });
  
      toast.present();
    }
    
    catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }

  }
  
  fecharModal() {
    this.modalController.dismiss();
  }
}
