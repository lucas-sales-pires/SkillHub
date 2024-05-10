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
import { ModalController } from '@ionic/angular';
import {
  share,
  trash,
  lockClosed,
  mailOutline,
  lockOpen,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.page.html',
  styleUrls: ['./administracao.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarADMComponent],
  providers: [ModalCertezaComponent, ModalController],
})
export class AdministracaoPage implements OnInit {
  async visualizarPerfil(usuario: any) {
    this.adm.usuario = usuario;
  }
  usuarios: any;
  usuario: any;
  id: any;
  usuarioAtual: any;
  bloqueado: any;

  constructor(
    private dados: Dados,
    private service: AuthService,
    private adm: AdmService
  ) {
    addIcons({
      trash: trash,
      share: share,
      lockClosed: lockClosed,
      mailOutline: mailOutline,
      lockOpen: lockOpen,
    });
  }
  

  
  enviarMensagem(usuarioSelecionado: any) {
    throw new Error('Method not implemented.');
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
