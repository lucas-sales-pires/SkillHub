import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { Dados } from 'src/app/services/dados/dados.service';
import { finalize } from 'rxjs/operators';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { addIcons } from 'ionicons';
import { trash, share, lockClosed, mailOutline, lockOpen } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { EfeitosVisuaisService } from 'src/app/services/efeitos/efeitos-visuais.service';


@Component({
    selector: 'app-mensagem-servidor-adm',
    templateUrl: './mensagem-servidor-adm.page.html',
    styleUrls: ['./mensagem-servidor-adm.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, NavbarComponent]
})
export class MensagemServidorAdmPage implements OnInit {


  usuarioAtual: any; 
  usuarios: any[] = []; 
  mensagens: any[] = []; 
  carregando = true;
  mensagem: any;

  
  async ngOnInit() {
    this.usuarioAtual = await this.service.buscarUsuario();
    this.autenticado.autenticado.set(true);

    this.chatService.getMensagensAdministrativas()
      .pipe(finalize(() => this.carregando = false))
      .subscribe((mensagens) => {
        this.mensagens = mensagens;
      });

      this.usuarios = [...await this.dados.PegarTodosUsuarios()];         

  }
  

  constructor(private chatService: ChatService, private service: AuthService, private dados: Dados,private autenticado:AuthService,private controller:AlertController,private efeitos: EfeitosVisuaisService) {
    addIcons({
      trash: trash,
      share: share,
      lockClosed: lockClosed,
      mailOutline: mailOutline,
      lockOpen: lockOpen,
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
        this.chatService.excluirMensagemRecebidaDoUsuario(id).subscribe();
        this.efeitos.mostrarToast(true,"Mensagem excluida com sucesso!")

      }
      async enviarMensagemParaTodos() {
        try {
          if(this.mensagem.value == ""){
            this.efeitos.mostrarToast(false,"Preencha o campo de mensagem!")
            return;
          }
          await this.chatService.enviarMensagensAdministrativasParaTodos(
            this.usuarios.map(u => u.nome),
            this.mensagem
          );
        this.efeitos.mostrarToast(true,"Mensagem enviada com sucesso!")
        } catch (error) {
          this.efeitos.mostrarToast(false,"Erro ao enviar mensagem!")
        }
      }
      

      
      

      
      }



