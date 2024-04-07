import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { eyeOutline, lockClosedOutline, eyeOffOutline } from 'ionicons/icons';
import { Dados } from '../../services/dados/dados.service';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, NavbarComponent],
})
export class CadastroPage implements OnInit {
  nome: string = '';
  email: string = '';
  senha: string = '';
  diaCadastro: string = ''; 
  mensagem: any = '';

  constructor(private cadastro: Dados) {
    addIcons({ eyeOutline, lockClosedOutline, eyeOffOutline });
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
    createUserWithEmailAndPassword(auth, this.email, this.senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
  
        const novoUsuario = {
          nome: this.nome,
          email: this.email,
          diaCadastro: new Date().toLocaleDateString(),
        };
        
        this.salvarInformacoesUsuario(novoUsuario);
        this.mensagem = 'Usuário criado com sucesso!';
        setTimeout(() => {
          this.mensagem = '';
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
  
        if (errorCode === 'auth/email-already-in-use') {
          this.mensagem = 'O email já está cadastrado.';
          setInterval(() => {
            this.mensagem = '';
          }, 3000);
        }
      });
  }
  
  salvarInformacoesUsuario(novoUsuario:any) {
    this.cadastro.CriarUsuario(novoUsuario).then(
      () => {
        console.log('Informações do usuário salvas com sucesso!');
      },
      (error) => {
        console.error('Erro ao salvar informações do usuário:', error.message);
      }
    );
  }
  
  

  ngOnInit() {}
}
