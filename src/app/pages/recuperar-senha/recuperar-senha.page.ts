import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { EfeitosVisuaisService } from 'src/app/services/efeitos/efeitos-visuais.service';

@Component({
    selector: 'app-recuperar-senha',
    templateUrl: './recuperar-senha.page.html',
    styleUrls: ['./recuperar-senha.page.scss'],
    standalone: true,
    imports: [IonicModule, FormsModule, NavbarComponent]
})
export class RecuperarSenhaPage {
  email = '';
  mensagem = '';
  erro:string =  "";

  constructor(private efeitos:EfeitosVisuaisService) { }


  recuperarSenha() {
    const auth = getAuth();
sendPasswordResetEmail(auth, this.email)
  .then(() => {
    this.mensagem = 'Email de recuperação de senha enviado.';
    this.efeitos.mostrarToast(true, 'Email de recuperação de senha enviado.');
    this.email = '';
    setInterval(() => {
      this.mensagem = '';
    }, 3000);
  })
  .catch(() => {
    this.efeitos.mostrarToast(false, 'Não foi possível enviar o email de recuperação de senha. Verifique se o email foi digitado corretamente.');
    this.email = '';

  });
}
}
