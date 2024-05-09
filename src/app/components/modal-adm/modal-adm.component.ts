import { ModalController } from '@ionic/angular';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonLabel, IonList, IonItem, IonText } from "@ionic/angular/standalone";
import { Component, OnInit } from '@angular/core';
import { Dados } from 'src/app/services/dados/dados.service';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { deleteUser, getAuth } from 'firebase/auth';
import { ModalCertezaComponent } from 'src/app/components/modal-certeza/modal-certeza.component';
import { AdmService } from 'src/app/services/adm/adm.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-modal-adm',
  templateUrl: './modal-adm.component.html',
  styleUrls: ['./modal-adm.component.scss'],
  standalone: true,
  imports: [IonText, IonItem, IonList, IonLabel, IonContent, IonIcon, IonButton, IonTitle, IonButtons, IonToolbar, IonHeader, IonModal,CommonModule ],
})
export class ModalADMComponent implements OnInit {
  usuario: any;
  usuarioAtual: any;
  usuarios:any;

  constructor(  private modalRef: ModalController,private dados: Dados, private service: AuthService,private modalCerteza: ModalCertezaComponent, private adm : AdmService
  ) {}

  fecharModal() {
    this.modalRef.dismiss();
  }
 
  async excluir(email: string) {
    const auth = getAuth();
    let usuarioAtual = auth.currentUser;
    if (usuarioAtual) {
      const id = (await this.dados.PegarIdPorEmail(email) || '');
  
      try {
        // Aguarda a exclusão do usuário no Authentication e no Firestore
        await Promise.all([
          deleteUser(usuarioAtual),
          this.dados.DeletarUsuario(id)
        ]);
  
        console.log('Usuário deletado com sucesso em ambos o Authentication e Firestore');
        window.location.reload();
        
        // Desloga o usuário após ambas as operações serem concluídas
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    } else {
      this.service.deslogar();
    }
  }



  enviarMensagem() {
    let usuarioSelecionado = this.usuario
    throw new Error('Method not implemented.');
  }

  deletarUsuario() {
    let usuarioSelecionado = this.usuario
      this.modalCerteza.exibirConfirmacao(() => this.excluir(usuarioSelecionado.email));
  }

  async bloquearUsuario() {
    let usuarioSelecionado = this.usuario 
    const id = (await this.dados.PegarIdPorEmail(usuarioSelecionado.email) || '');
    this.dados.BloquearUsuario(id)
    usuarioSelecionado.status = 'Bloqueado';
  }
  
  async desbloquearUsuario() {
    let usuarioSelecionado = this.usuario
    const id = (await this.dados.PegarIdPorEmail(usuarioSelecionado.email) || '');
    usuarioSelecionado.status = 'Desbloqueado';
    this.dados.DesbloquearUsuario(id)
  }

  async ngOnInit() {
    this.usuarios = (await this.dados.PegarTodosUsuarios());
    await this.service.buscarUsuario().then((usuario) => {
      this.usuarioAtual = usuario
      for(let j of this.usuarios){
        if(j.bloqueado ){
          j.status = 'Bloqueado'
        }
        else{
          j.status = 'Desbloqueado'
          j.bloqueado = false
        }
      }
    });
    this.usuario = this.adm.usuario;
  }
}
