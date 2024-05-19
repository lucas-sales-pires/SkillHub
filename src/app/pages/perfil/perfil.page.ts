import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dados } from 'src/app/services/dados/dados.service';
import { deleteUser, getAuth } from 'firebase/auth';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  IonContent,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonItem,
  IonCardContent,
  IonLabel,
  IonButton,
  IonInput,
  IonIcon,
  IonAvatar,
  IonProgressBar,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { FeedbackComponent } from '../../components/feedback/feedback.component';
import { ModalCertezaComponent } from 'src/app/components/modal-certeza/modal-certeza.component';
import { ref, Storage } from '@angular/fire/storage';
import { getDownloadURL, listAll, uploadBytesResumable } from 'firebase/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonLabel,
    IonCardContent,
    IonItem,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonContent,
    FormsModule,
    NavbarComponent,
    IonInput,
    FeedbackComponent,
    IonAvatar,
    IonProgressBar,
  ],
  providers: [ModalCertezaComponent],
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

  constructor(
    private dados: Dados,
    private service: AuthService,
    private modalCerteza: ModalCertezaComponent
  ) {
    effect(() => {
      this.pegarTodasAsFotos().then((res) => {
        console.log(res);
      });
    });
  }

  ngOnInit(): void {
    
    
    try {
      this.service.buscarUsuario().then((resultado: any) => {
        this.email = resultado['email']; // Atribui ao this.email o email dele
        this.carregarUsuario(this.email); //A função carregarUsuario precisa do email do usuário para ser executada
        if (this.email === '') {
          this.service.deslogar();
        }
        console.log('Resultado da busca de usuário:', resultado);

      }).then(() => {
        this.pegarTodasAsFotos();;
      }).catch((error) => {
        console.error('Erro ao buscar usuário:', error);
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
    
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
  }
}




  async carregarUsuario(email: string) {
    const usuario = await this.dados.PegarUsuarioPorEmail(email); // Usuário recebe uma requisição assincrona pra pegar os dados do usuário baseado no email
    this.idUsuarioAtual = await this.dados.PegarIdPorEmail(email) || ''; // Pega o ID do usuário
    if (usuario) {
      // Se existir este usuário
      this.nome = usuario['nome']; // Preenche o nome dele
      this.cadastradoDesde = usuario['diaCadastro']; // Preenche a data de cadastro
    } else {
      this.service.deslogar(); // Utiliza a função de deslogar
    }
  }

  async editarPerfil() {
    const auth = getAuth();
    let usuarioAtual = auth.currentUser; // Usuário Atual
    this.editando = true; // A variável editando == true que sera utilizado no perfil.page.html

    if (usuarioAtual?.email === this.email) {
      // Se o usuárioAtual.email for igual ao this.email
      const inputs = document.querySelectorAll('ion-input'); // Pego todos os ion-input

      inputs.forEach((input) => {
        // Pega cada input
        if (input.id !== 'cadastradoDesdeInput') {
          // Menos o que tem o id de cadastradoDesdeInput
          input.removeAttribute('disabled'); // Remove o atributo disabled e fica disponivel pra editar
        }
      });
      const id = (await this.dados.PegarIdPorEmail(this.email)) || ''; // Pego o ID do usuario
      this.dados
        .AtualizarUsuario(id, {
          // Utilizo a função para atualizar o Usuário
          nome: this.nome,
          email: this.email,
        })
        .subscribe(() => {
          // Como é um Observable utilizo o subscribe para emitir a mensagem de usuário atualizado
          console.log('Usuário atualizado com sucesso');
        });
    } else {
      this.service.deslogar(); // Deslogo, pois o usuario não está conectado
    }
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
      // Aguarda a exclusão do usuário no Authentication e no Firestore
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

      console.log(
        'Usuário deletado com sucesso em ambos o Authentication e Firestore'
      );

      // Desloga o usuário após ambas as operações serem concluídas
      this.service.deslogar();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  }
}
