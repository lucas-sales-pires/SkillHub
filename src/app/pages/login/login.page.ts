import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import {
  eye,
  lockClosed,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent],
})
export class LoginPage implements OnInit {
  email: string = '';
  senha: string = '';
  mensagem: string = '';
  

  constructor(private router: Router) {
    addIcons({ eye, lockClosed, lockClosedOutline, eyeOutline, eyeOffOutline });
  }
  async logar() {
    const auth = getAuth();

    const usuarioAtual = auth.currentUser;


    if (usuarioAtual) {
      this.mensagem = 'Usuário já logado.';
      setInterval(() => {
        this.mensagem = '';
        this.router.navigate(['/perfil']);
      }, 3000);
      return;
    }
    signInWithEmailAndPassword(auth, this.email, this.senha)
      .then(() => {
        this.mensagem = 'Usuário logado com sucesso.';
        

        setInterval(() => {
          this.mensagem = '';
          this.router.navigate(['/perfil']);
        }, 3000);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);

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
  ngOnInit() {}
}
