import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { FeedbackComponent } from "../../components/feedback/feedback.component";
import { ModalCertezaComponent } from 'src/app/components/modal-certeza/modal-certeza.component';


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
        FeedbackComponent
    ],
    providers: [ModalCertezaComponent]
})
export class PerfilPage implements OnInit {
  nome: string = '';
  email: string  = '';
  cadastradoDesde: string = '';
  editando: boolean = false;


  constructor(private dados: Dados, private service: AuthService,private modalCerteza: ModalCertezaComponent) {}

  ngOnInit(): void {
    this.service.buscarUsuario().then((resultado: any) => { // buscarUsuário retorna os dados do usuário atual 
      this.email = resultado["email"]; // Atribui ao this.email o email dele
      this.carregarUsuario(this.email); //A função carregarUsuario precisa do email do usuário para ser executada
    })
  }

  async carregarUsuario(email:string) {
      const usuario = await this.dados.PegarUsuarioPorEmail(email); // Usuário recebe uma requisição assincrona pra pegar os dados do usuário baseado no email
      if (usuario) { // Se existir este usuário 
        this.nome = usuario['nome']; // Preenche o nome dele 
        this.cadastradoDesde = usuario['diaCadastro'];// Preenche a data de cadastro
      }
      else{
        this.service.deslogar(); // Utiliza a função de deslogar
      }
   
    } 
  
  async editarPerfil() {
    const auth = getAuth();  
    let usuarioAtual = auth.currentUser; // Usuário Atual
    this.editando = true; // A variável editando == true que sera utilizado no perfil.page.html

    
    if (usuarioAtual?.email === this.email) { // Se o usuárioAtual.email for igual ao this.email
      const inputs = document.querySelectorAll('ion-input'); // Pego todos os ion-input

      inputs.forEach((input) => { // Pega cada input 
        if (input.id !== 'cadastradoDesdeInput') { // Menos o que tem o id de cadastradoDesdeInput
          input.removeAttribute('disabled'); // Remove o atributo disabled e fica disponivel pra editar
        }
      });
      const id = (await this.dados.PegarIdPorEmail(this.email)) || ''; // Pego o ID do usuario
      this.dados 
        .AtualizarUsuario(id, { // Utilizo a função para atualizar o Usuário 
          nome: this.nome,
          email: this.email,
        })
        .subscribe(() => { // Como é um Observable utilizo o subscribe para emitir a mensagem de usuário atualizado
          console.log('Usuário atualizado com sucesso');
          
        });
    } else {
      this.service.deslogar();// Deslogo, pois o usuario não está conectado
    }
  }
  async Sair(){
    this.service.deslogar()
  }
  async deletarConta() {
    this.modalCerteza.exibirConfirmacao(() => this.excluir());
  }
  
  async excluir() {
    const auth = getAuth();
    let usuarioAtual = auth.currentUser;
    if (usuarioAtual) {
      const id = (await this.dados.PegarIdPorEmail(this.email)) || '';
      try {
        await deleteUser(usuarioAtual) ; // Aguarda a resolução da promessa
        console.log('Usuário deletado com sucesso no Authentication');
        await this.dados.DeletarUsuario(id).then(()=>{
          console.log('Usuário deletado com sucesso no Firestore');
          this.service.deslogar()
        }
        ); 
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    } else {
      this.service.deslogar();
    }
  }
  
  
  
}
