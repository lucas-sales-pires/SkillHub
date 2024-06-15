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
import { EfeitosVisuaisService } from 'src/app/services/efeitos/efeitos-visuais.service';


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
  

  constructor(private chatService: ChatService, private service: AuthService, private dados: Dados,private autenticado:AuthService,private controller:AlertController,private efeitos: EfeitosVisuaisService) {
    addIcons({
      trash: trash,
      });
    
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
    this.efeitos.mostrarToast(true,"Mensagem excluida com sucesso!")
  }
  

  async enviarMensagem(mensagem: any) {
    try{
      if (mensagem.value === ''){
        this.efeitos.mostrarToast(false,'Preencha o campo de mensagem!');
        return;
      }
      this.chatService.usuarioEnviarMensagemAdm(this.usuarioAtual.nome,mensagem.value);
      this.efeitos.mostrarToast(true,'Mensagem enviada com sucesso!');
    }
    catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      this.efeitos.mostrarToast(false,'Erro ao enviar mensagem!');
    }
  

    mensagem.value = '';


  }
}

