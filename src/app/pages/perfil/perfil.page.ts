import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dados } from 'src/app/services/dados/dados.service';
import { getAuth } from 'firebase/auth';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';
import { IonContent, IonCardHeader, IonCard, IonCardTitle, IonItem, IonCardContent, IonLabel, IonButton,IonInput } from "@ionic/angular/standalone";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonCardContent, IonItem, IonCardTitle, IonCard, IonCardHeader, IonContent,  FormsModule, NavbarComponent,IonInput],
})
export class PerfilPage implements OnInit {
  nome: string = '';
  email: any = '';
  cadastradoDesde: string = '';
  editar = 'false';
  sair = 'false';

  constructor(private dados: Dados, private router: Router) {}

  ngOnInit(): void {
      this.carregarUsuario();
  }


  async carregarUsuario() {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      this.email = currentUser.email;
      const usuario = await this.dados.PegarUsuarioPorEmail(this.email);
      if (usuario) {
        this.nome = usuario['nome'];
        this.cadastradoDesde = usuario['diaCadastro'];
      }
    } else {
      console.log('Nenhum usuário está atualmente logado');
    }
  }
  async editarPerfil() {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const inputs = document.querySelectorAll('ion-input');

      inputs.forEach((element: HTMLIonInputElement) => {
        if (element.id !== 'cadastradoDesdeInput') {
          element.removeAttribute('disabled');
        }
      });
      const id = (await this.dados.PegarIdPorEmail(this.email)) || '';
      this.dados.AtualizarUsuario(id, {
        nome: this.nome,
        email: this.email,
        
      }).subscribe(() => {
        console.log('Usuário atualizado com sucesso');
      }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
  async sairConta() {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      auth.signOut().then(() => {
        console.log('Usuário desconectado');
        this.router.navigate(['/login']);
      });
    } else {
      console.log('Nenhum usuário está atualmente logado');
    }
  }
}
