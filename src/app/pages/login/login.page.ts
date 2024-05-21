import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import {eye,lockClosed,lockClosedOutline,eyeOutline,eyeOffOutline,
} from 'ionicons/icons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { IonInput, IonButton, IonIcon, IonCardContent, IonCardTitle, IonContent, IonCard, IonCardHeader } from '@ionic/angular/standalone';
import { Dados } from 'src/app/services/dados/dados.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCardHeader, IonCard, IonContent, IonCardTitle, IonCardContent, IonIcon, IonButton, FormsModule, NavbarComponent,IonInput],
})
export class LoginPage implements OnInit {
  email: string = '';
  senha: string = '';
  mensagem: string = '';

  
  constructor(private dados: Dados) {
    addIcons({ eye, lockClosed, lockClosedOutline, eyeOutline, eyeOffOutline }); 
    
  }
  async logar() {
    const auth = getAuth();
    const resposta =await  this.dados.VerificarSeEstaBloqueado(this.email)
    if(resposta){
      this.mensagem = 'Usuário bloqueado.';
      setInterval(() => {
        this.mensagem = '';
      }, 3000);
      return;
    }
    
    this.email.toLowerCase();
    await signInWithEmailAndPassword(auth, this.email, this.senha)
      .then(() => {
        this.mensagem = 'Usuário logado com sucesso.';
        setInterval(() => {
          this.mensagem = '';
          window.location.href="/perfil"
        }, 3000);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        if(errorCode === 'auth/invalid-email'){
          this.mensagem = 'E-mail ou Senha inválido.';
          setInterval(() => {
            this.mensagem = '';
          }, 3000);
        }
  
        if (errorCode === 'auth/invalid-credential') {
          this.mensagem =
            'Credenciais inválidas. Verifique seu e-mail e senha.';
          setInterval(() => {
            this.mensagem = '';
          }, 3000);
        } else if (errorCode === 'auth/user-not-found') {
          this.mensagem = 'Usuário não cadastrado.';
          setInterval(() => {
            this.mensagem = '';
          }, 3000);
        }
      });

  }

  valor: any = 'eye-outline';

  mudarVisibilidade(verificar: any) {
    const formato = verificar.type;
    verificar.type = formato === 'password' ? 'text' : 'password';
    this.valor = formato === 'password' ? 'eye-off-outline' : 'eye-outline';
  }
  ngOnInit() {
    this.email = '';
    this.senha = '';
  }
}
