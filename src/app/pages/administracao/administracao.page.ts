import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Dados } from 'src/app/services/dados/dados.service';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { ModalCertezaComponent } from 'src/app/components/modal-certeza/modal-certeza.component';
import { AdmService } from 'src/app/services/adm/adm.service';
import { ModalController } from '@ionic/angular';
import {share,trash,lockClosed,mailOutline,lockOpen,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ModalChatComponent } from 'src/app/components/modal-chat/modal-chat.component';


@Component({
    selector: 'app-administracao',
    templateUrl: './administracao.page.html',
    styleUrls: ['./administracao.page.scss'],
    standalone: true,
    providers: [ModalCertezaComponent, ModalController],
    imports: [IonicModule, CommonModule, FormsModule, NavbarComponent]
})
export class AdministracaoPage implements OnInit {
  usuarios: any;
  usuario: any;
  id: any;
  usuarioAtual: any= '';
  bloqueado: any;
  ultimaImagem: any;

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

  constructor(
    private dados: Dados,
    private service: AuthService,
    private adm: AdmService,
    private ModalController: ModalController
    
  ) {
    addIcons({
      trash: trash,
      share: share,
      lockClosed: lockClosed,
      mailOutline: mailOutline,
      lockOpen: lockOpen,
    });
  }
  
  
  async visualizarPerfil(usuario: any) {
    this.adm.usuario = usuario;
  }
  
  async enviarMensagem(usuarioSelecionado: any) {
    const modal = await this.ModalController.create({
      component: ModalChatComponent,
      componentProps: {
        usuarioSelecionado: usuarioSelecionado 
      }
    });
    return await modal.present();
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


}
