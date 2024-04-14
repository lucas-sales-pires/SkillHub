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
  ],
})
export class PerfilPage implements OnInit {
  nome: string = '';
  email: string  = '';
  cadastradoDesde: string = '';
  editando: boolean = false;


  constructor(private dados: Dados, private service: AuthService) {}

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
    const auth = getAuth();
    let usuarioAtual = auth.currentUser;
    if (usuarioAtual) {
      const id = (await this.dados.PegarIdPorEmail(this.email)) || '';
      deleteUser(usuarioAtual).then(() => { // Deleto o usuário atual do Firebaase Autenthication
        console.log('Usuário deletado com sucesso no Autenthication');
        this.dados.DeletarUsuario(id).subscribe(() => { // Utilizo a função criado no service para deletar o usuário no firestore
          console.log('Usuário deletado com sucesso no Firestore');
          this.service.deslogar(); // Deslogo, pois este usuário foi excluido
        });
      });
    } else {
      this.service.deslogar();
    }
  }
}
