import { Component, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { eyeOutline, lockClosedOutline, eyeOffOutline } from 'ionicons/icons';
import { Dados } from '../../services/dados/dados.service';
import { AcordoService } from '../../services/acordo/acordo.service';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { IonInput, IonButton, IonIcon, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent } from '@ionic/angular/standalone';
import { ModalAcordoComponent } from "../../components/modal-acordo/modal-acordo.component";
import { EfeitosVisuaisService } from 'src/app/services/efeitos/efeitos-visuais.service';


@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.page.html',
    styleUrls: ['./cadastro.page.scss'],
    standalone: true,
    imports: [IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem, IonIcon, IonButton, FormsModule, NavbarComponent, IonInput, ModalAcordoComponent]
})
export class CadastroPage  {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  diaCadastro: string = ''; 
  mensagem: any = '';
  termo:any;

  constructor(private cadastro: Dados, private acordo: AcordoService, private efeitos: EfeitosVisuaisService) {
    addIcons({ eyeOutline, lockClosedOutline, eyeOffOutline });
    effect(() => {
      this.termo = this.acordo.pegarTermos();
    });
  }
  valor: any = 'eye-outline';

  mudarVisibilidade(input: any) {
    if (input.type == 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
    this.valor = input.type == 'password' ? 'eye-outline' : 'eye-off-outline';
  }
  

  cadastrar() {
    const auth = getAuth();
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.mensagem = 'Preencha todos os campos!';
      this.efeitos.mostrarToast(false, this.mensagem);
      setTimeout(() => this.mensagem = '', 3000);
      return;
    }
    if (this.acordo.termo() == false) {
      this.mensagem = 'Você precisa aceitar os termos de uso!';
      this.efeitos.mostrarToast(false, this.mensagem);
      setTimeout(() => this.mensagem = '', 3000);
      return;
    }
    if (this.senha !== this.confirmarSenha) {
      this.mensagem = 'As senhas não conferem!';
      this.efeitos.mostrarToast(false, this.mensagem);
      setTimeout(() => this.mensagem = '', 3000);
      return;
    }
  
    this.email = this.email.toLowerCase();
    const novoUsuario = {
      nome: this.nome,
      email: this.email,
      diaCadastro: new Date().toLocaleDateString(),
      senha : this.senha,
      bloqueado: false,
    };
    
  
    this.cadastro.CriarUsuario(novoUsuario).then(resultado => {
      if (resultado) {
        createUserWithEmailAndPassword(auth, this.email, this.senha)
          .then(() => {
            this.mensagem = 'Usuário criado com sucesso!';
            this.efeitos.mostrarToast(true, this.mensagem);
            setTimeout(() => {
              this.mensagem = '';
              window.location.href = "/login";
            }, 3000);
          })
          .catch((error) => {
            this.mensagem = 'Erro ao criar usuário: ' + error.message;
            this.efeitos.mostrarToast(false, this.mensagem);
          });
      } else {
        this.mensagem = 'Nome ou email já cadastrado!';
        this.efeitos.mostrarToast(false, this.mensagem);
      }
    });
  }
  
  salvarInformacoesUsuario(novoUsuario: any) {
    this.cadastro.CriarUsuario(novoUsuario).then(
      () => {}, // Sucesso, já tratado em `cadastrar`
      (error: any) => {
        this.mensagem = 'Erro ao salvar informações: ' + error.message;
        this.efeitos.mostrarToast(false, this.mensagem);
      }
    );
  }
}
