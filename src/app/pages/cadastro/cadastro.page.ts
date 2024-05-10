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

  constructor(private cadastro: Dados, private acordo: AcordoService) {
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
    if(this.nome === '' || this.email === '' || this.senha === '' || this.confirmarSenha === ''){
        this.mensagem = 'Preencha todos os campos!';
        console.log(this.termo);
        setTimeout(() => {
            this.mensagem = '';
        }, 3000);
        return;
    }
    if(this.acordo.termo() == false){
        this.mensagem = 'Você precisa aceitar os termos de uso!';
        setTimeout(() => {
            this.mensagem = '';
        }, 3000);
        return;
    }
    if(this.senha !== this.confirmarSenha){
        this.mensagem = 'As senhas não conferem!';
        setTimeout(() => {
            this.mensagem = '';
        }, 3000);
        return;
    }

    this.email.toLowerCase()
    const novoUsuario = { // Pego estes dados do usuario
      nome: this.nome,
      email: this.email,
      diaCadastro: new Date().toLocaleDateString(),
      bloqueado: false,
    };
    
      this.salvarInformacoesUsuario(novoUsuario); 
  
  
  
this.email.toLocaleLowerCase();
  
    if(this.cadastro.resultado() == false){

    createUserWithEmailAndPassword(auth, this.email, this.senha)
      .then(() => {
        this.mensagem = 'Usuário criado com sucesso!';
        setTimeout(() => {
          this.mensagem = '';
          window.location.href = "/login"
        }, 3000);
      })
    
  }
  }
  salvarInformacoesUsuario(novoUsuario:any) {
    this.cadastro.CriarUsuario(novoUsuario).then( 
      () => {
        console.log('Informações do usuário salvas com sucesso!');
      },
    
        (error: any) => { 
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
      
          if (errorCode === 'auth/email-already-in-use') {
              this.mensagem = 'O email já está cadastrado.';
              setTimeout(() => {
                  this.mensagem = '';
              }, 3000);
          }
          if (errorCode === 'auth/invalid-email') {
              this.mensagem = 'O email é inválido.';
              setTimeout(() => {
                  this.mensagem = '';
              }, 3000);
              
          }
          if (errorCode === 'auth/weak-password') {
              this.mensagem = 'A senha deve ter 6 caracteres.';
              setTimeout(() => {
                  this.mensagem = '';
              }, 3000);
          }
          if (errorMessage === 'O nome já está cadastrado.') { 
              this.mensagem = 'O nome já está cadastrado.';
              setTimeout(() => {
                  this.mensagem = '';
              }, 3000);
              
          }
      }
    );
  }
  
  


}
