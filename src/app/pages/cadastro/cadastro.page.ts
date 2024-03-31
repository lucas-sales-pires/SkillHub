import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { eyeOutline, lockClosedOutline,eyeOffOutline } from 'ionicons/icons';
import { DataService } from '../../services/dados/dados.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent]
})
export class CadastroPage implements OnInit {
  nome: string = "";
  email: string = "";
  senha: string = "";
  

  constructor(private cadastro: DataService) {

    
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
  createUser(): void {
    const newUser = { nome: this.nome, email: this.email, senha: this.senha };
    this.cadastro.createUser(newUser).subscribe(() => {
        console.log('Usuário criado com sucesso!');
    });
  
}

  ngOnInit() {
  }

}

