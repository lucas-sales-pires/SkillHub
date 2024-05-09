import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarADMComponent } from '../../components/navbarADM/navbar-adm/navbar-adm.component';
import { Dados } from 'src/app/services/dados/dados.service';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { deleteUser, getAuth } from 'firebase/auth';
import { ModalCertezaComponent } from 'src/app/components/modal-certeza/modal-certeza.component';
import { AdmService } from 'src/app/services/adm/adm.service';
import { ModalADMComponent } from 'src/app/components/modal-adm/modal-adm.component';
import { ModalController } from '@ionic/angular';
import { share,trash,pin} from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.page.html',
  styleUrls: ['./administracao.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarADMComponent],
  providers: [ModalCertezaComponent, ModalADMComponent, ModalController],
})
export class AdministracaoPage implements OnInit {
  async visualizarPerfil(_t5: any) { 
    this.adm.usuario = _t5;
    const modal = await this.modalController.create({
      component: ModalADMComponent,
    });
    await modal.present();
  }
  usuarios: any;
  usuario: any;
  id: any;
  usuarioAtual: any;
  bloqueado: any;

  constructor(
    private dados: Dados,
    private service: AuthService,
    private modalCerteza: ModalCertezaComponent,
    private adm: AdmService,
    private modalController: ModalController
  ) {
    addIcons({
      'trash': trash,
      'share': share,
      'pin': pin
    });
  }

  async excluir(email: string) {
    const auth = getAuth();
    let usuarioAtual = auth.currentUser;
    if (usuarioAtual) {
      const id = (await this.dados.PegarIdPorEmail(email)) || '';

      try {
        // Aguarda a exclusão do usuário no Authentication e no Firestore
        await Promise.all([
          deleteUser(usuarioAtual),
          this.dados.DeletarUsuario(id),
        ]);

        console.log(
          'Usuário deletado com sucesso em ambos o Authentication e Firestore'
        );
        window.location.reload();

        // Desloga o usuário após ambas as operações serem concluídas
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    } else {
      this.service.deslogar();
    }
  }

  enviarMensagem(usuarioSelecionado: any) {
    throw new Error('Method not implemented.');
  }

  deletarUsuario(usuarioSelecionado: any) {
    this.modalCerteza.exibirConfirmacao(() =>
      this.excluir(usuarioSelecionado.email)
    );
  }

  async bloquearUsuario(usuarioSelecionado: any) {
    const id =
      (await this.dados.PegarIdPorEmail(usuarioSelecionado.email)) || '';
    this.dados.BloquearUsuario(id);
    usuarioSelecionado.status = 'Bloqueado';
  }

  async desbloquearUsuario(usuarioSelecionado: any) {
    const id =
      (await this.dados.PegarIdPorEmail(usuarioSelecionado.email)) || '';
    usuarioSelecionado.status = 'Desbloqueado';
    this.dados.DesbloquearUsuario(id);
  }

  async ngOnInit() {
    this.usuarios = await this.dados.PegarTodosUsuarios();
    await this.service.buscarUsuario().then((usuario) => {
      this.usuarioAtual = usuario;
      for (let j of this.usuarios) {
        if (j.bloqueado) {
          j.status = 'Bloqueado';
        } else {
          j.status = 'Desbloqueado';
          j.bloqueado = false;
        }
      }
    });
  }
}
