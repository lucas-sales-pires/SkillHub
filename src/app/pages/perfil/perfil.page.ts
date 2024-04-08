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
  email: any = '';
  cadastradoDesde: string = '';

  constructor(private dados: Dados, private router: Router) {}

  ngOnInit(): void {
    this.carregarUsuario();
  }
  ngAfterViewInit(): void {
    setInterval(() => {
      if (this.nome == '') {
        this.sairConta();
      }
    }, 2000);
  }

  async carregarUsuario() {
    const auth = getAuth();

    let currentUser = auth.currentUser;
    if (currentUser !== null) {
      this.email = currentUser.email;
      const usuario = await this.dados.PegarUsuarioPorEmail(this.email);
      if (usuario) {
        this.nome = usuario['nome'];
        this.cadastradoDesde = usuario['diaCadastro'];
      }
    } else {
      this.sairConta();
      return;
    }
  }
  async editarPerfil() {
    const auth = getAuth();
    let currentUser = auth.currentUser;

    if (currentUser?.email === this.email) {
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
      this.sairConta();
    }
  }
  async sairConta() {
    const auth = getAuth();
    auth.signOut().then(() => {
      console.log('Usuário desconectado');
      window.location.href = '/login';
    });
  }
  async deletarConta() {
    const auth = getAuth();
    let currentUser = auth.currentUser;
    if (currentUser) {
      const id = (await this.dados.PegarIdPorEmail(this.email)) || '';
      deleteUser(currentUser).then(() => {
        console.log('Usuário deletado com sucesso no Autenthication');
        this.dados.DeletarUsuario(id).subscribe(() => {
          console.log('Usuário deletado com sucesso no Firestore');
          this.sairConta();
        });
      });
    } else {
      this.sairConta();
    }
  }
}
