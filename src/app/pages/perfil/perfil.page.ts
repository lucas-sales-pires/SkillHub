import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dados } from 'src/app/services/dados/dados.service';
import { deleteUser, getAuth } from 'firebase/auth';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {IonContent,IonCardHeader,IonCard,IonCardTitle,IonItem,IonCardContent,IonLabel,IonButton,IonInput,IonIcon,IonAvatar,IonProgressBar,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { FeedbackComponent } from '../../components/feedback/feedback.component';
import { ModalCertezaComponent } from 'src/app/components/modal-certeza/modal-certeza.component';
import { ref, Storage } from '@angular/fire/storage';
import { getDownloadURL, listAll, uploadBytesResumable } from 'firebase/storage';
import { EfeitosVisuaisService } from 'src/app/services/efeitos/efeitos-visuais.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
    standalone: true,
    providers: [ModalCertezaComponent],
    imports: [IonIcon, IonButton, IonLabel, IonCardContent, IonItem, IonCardTitle, IonCard, IonCardHeader, IonContent, FormsModule, NavbarComponent, IonInput, FeedbackComponent, IonAvatar, IonProgressBar]
})
export class PerfilPage implements OnInit {
  nome: string = '';
  email: string = '';
  cadastradoDesde: string = '';
  editando: boolean = false;
  arquivo!: File;
  progresso = 0;
  idUsuarioAtual:string = '';
  ultimaFotoURL = signal('');
  private readonly storage: Storage = inject(Storage);

  ngOnInit(): void {
    
    try {
      this.service.buscarUsuario().then((resultado: any) => {
        this.email = resultado['email'];
        this.carregarUsuario(this.email); 
        if (this.email === '' || this.nome) {
          this.service.deslogar();
        }

      }).then(() => {
        this.pegarTodasAsFotos();;
      }).catch((error) => {
        console.error('Erro ao buscar usuário:', error);
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
    
}

  constructor(
    private dados: Dados,
    private service: AuthService,
    private modalCerteza: ModalCertezaComponent,
    private efeitos: EfeitosVisuaisService
  ) {
    effect(() => {
      this.pegarTodasAsFotos().then((res) => {
        console.log(res);
      });
    });
  }




async changeInput(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    this.arquivo = input.files[0];
    await this.carregarFoto();
  }
}

async carregarFoto(): Promise<void> {
    if (!this.arquivo || !this.idUsuarioAtual) {
        return; 
    }

    const storageRef = ref(this.storage, `uploads/${this.arquivo.name + this.idUsuarioAtual}`);
    const task = uploadBytesResumable(storageRef, this.arquivo);

    task.on('state_changed', async (snapshot) => {
        this.progresso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if(this.progresso == 100){
        const downloadURL = await getDownloadURL(storageRef);
        this.ultimaFotoURL.set(downloadURL);
        this.dados.AdicionarFotoNoUsuario(this.email, downloadURL);
      }
    });
}

async pegarTodasAsFotos() {
  try {
    const storageRef = ref(this.storage, 'uploads/');
    const resultado = await listAll(storageRef);
    
    const fotos = resultado.items;
    for (const foto of fotos) {
      const url = await getDownloadURL(foto);
      if (url.includes(this.idUsuarioAtual)) {
        this.ultimaFotoURL.set(url);     
        this.service.fotoUsuario.set(this.ultimaFotoURL());
        this.dados.AdicionarFotoNoUsuario(this.email, url);
      }
    }
  } catch (error) {
    console.error('Erro ao recuperar fotos:', error);
    this.efeitos.mostrarToast(false, 'Erro ao recuperar fotos.');
  }
}




  async carregarUsuario(email: string) {
    const usuario = await this.dados.PegarUsuarioPorEmail(email);
    this.idUsuarioAtual = await this.dados.PegarIdPorEmail(email) || '';
    if (usuario) {
      this.nome = usuario['nome']; 
      this.cadastradoDesde = usuario['diaCadastro'];
    } else {
      this.service.deslogar();
    }
  }
  async editarPerfil() {
    const auth = getAuth();
    const usuarioAtual = auth.currentUser;
  
    if (!usuarioAtual || usuarioAtual.email !== this.email) {
      this.service.deslogar();
      return;
    }
  
    this.editando = !this.editando;
    this.toggleInputs(this.editando);
  }
  
  async salvarAlteracoes() {
    const id = (await this.dados.PegarIdPorEmail(this.email)) || '';
    if(this.nome === '' || this.email === ''){
      this.efeitos.mostrarToast(false, 'Preencha todos os campos');
      return;
    }
    if(this.email.includes('@') === false){
      this.efeitos.mostrarToast(false, 'E-mail inválido');
      return;
    }
    if(this.nome.length < 3){
      this.efeitos.mostrarToast(false, 'Nome muito curto');
      return;
    }
    this.dados.AtualizarUsuario(id, {
      nome: this.nome,
      email: this.email,
    }).subscribe({
      next: () => {
        this.efeitos.mostrarToast(true, 'Usuário atualizado com sucesso');
        this.editando = false; 
        this.toggleInputs(false); 
      },
      error: (error) => {
        console.error('Erro ao atualizar usuário:', error);
        this.efeitos.mostrarToast(false, 'Erro ao atualizar usuário');
      }
    });
  }
  
  toggleInputs(habilitar: boolean) { 
    document.querySelectorAll('ion-input').forEach((input) => {
      if (input.id !== 'cadastradoDesdeInput') {
        input[habilitar ? 'removeAttribute' : 'setAttribute']('disabled', 'true');
      }
    });
  }
  
  async Sair() {
    this.service.deslogar();
  }
  async deletarConta() {
    await this.modalCerteza.exibirConfirmacao(() => this.excluir());
  }

  async excluir() {
    const auth = getAuth();
    let usuarioAtual = auth.currentUser;

    const id = (await this.dados.PegarIdPorEmail(this.email)) || '';

    try {
      await Promise.all([
        this.dados
          .DeletarUsuario(id)
          .then(() => console.log('Usuário deletado com sucesso no Firestore'))
          .then(() =>
            deleteUser(usuarioAtual!).then(() =>
              console.log('Usuário deletado com sucesso no Authentication')
            )
          ),
      ]);

        this.efeitos.mostrarToast(true, 'Usuário deletado com sucesso')

      this.service.deslogar();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      this.efeitos.mostrarToast(false, 'Erro ao excluir usuário.');
    }
  }


  
}
