import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { eyeOutline, lockClosedOutline,eyeOffOutline } from 'ionicons/icons';
import { Dados } from '../../services/dados/dados.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, NavbarComponent]
})
export class CadastroPage implements OnInit {
  nome: string = "";
  email: string = "";
  senha: string = "";
  

  constructor(private cadastro: Dados) {

    
    addIcons({ eyeOutline, lockClosedOutline,eyeOffOutline})
  }
  valor: any = "eye-outline";
  
  mudarVisibilidade(input:any){
    if(input.type == "password"){
      input.type = "text";
    }else{
      input.type = "password";
    }
    this.valor = (input.type == "password") ? "eye-outline" : "eye-off-outline";
  }
  cadastrar(): void {
    const novoUsuario = { nome: this.nome, email: this.email, senha: this.senha };
    this.cadastro.CriarUsuario(novoUsuario).subscribe(() => {
        console.log('Usuário criado com sucesso!');
    });
  
}

  ngOnInit() {
  }

}

