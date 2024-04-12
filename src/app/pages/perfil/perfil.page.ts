import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dados } from 'src/app/services/dados/dados.service';
import { deleteUser, getAuth } from 'firebase/auth';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';
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
  email: any  = '';
  cadastradoDesde: string = '';
  editando: boolean = false;


  constructor(private dados: Dados, private router: Router,private service: AuthService) {}

  ngOnInit(): void {
    this.service.buscarUsuario().then((resultado: any) => {
      this.email = resultado["email"];
      this.carregarUsuario(this.email);
    })
  }

  async carregarUsuario(email:any) {
      const usuario = await this.dados.PegarUsuarioPorEmail(email);
      if (usuario) {
        this.nome = usuario['nome'];
        this.cadastradoDesde = usuario['diaCadastro'];
      }
      if(this.nome == ""){
        this.carregarUsuario(email)
      }
    } 
  
  async editarPerfil() {
    const auth = getAuth();
    let usuarioAtual = auth.currentUser;
    this.editando = true;

    
    if (usuarioAtual?.email === this.email) {
      const inputs = document.querySelectorAll('ion-input');

      inputs.forEach((element: HTMLIonInputElement) => {
        if (element.id !== 'cadastradoDesdeInput') {
          element.removeAttribute('disabled');
        }
      });
      const id = (await this.dados.PegarIdPorEmail(this.email)) || '';
      this.dados
        .AtualizarUsuario(id, {
          nome: this.nome,
          email: this.email,
        })
        .subscribe(() => {
          console.log('Usuário atualizado com sucesso');
          
        });
    } else {
      this.service.deslogar();
    }
  }
  async sairDaConta(){
    this.service.deslogar();
  }

  async deletarConta() {
    const auth = getAuth();
    let usuarioAtual = auth.currentUser;
    if (usuarioAtual) {
      const id = (await this.dados.PegarIdPorEmail(this.email)) || '';
      deleteUser(usuarioAtual).then(() => {
        console.log('Usuário deletado com sucesso no Autenthication');
        this.dados.DeletarUsuario(id).subscribe(() => {
          console.log('Usuário deletado com sucesso no Firestore');
          this.service.deslogar();
        });
      });
    } else {
      this.service.deslogar();
    }
  }
}
