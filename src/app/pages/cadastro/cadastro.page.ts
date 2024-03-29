import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { eyeOutline, lockClosedOutline,eyeOffOutline } from 'ionicons/icons';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent]
})
export class CadastroPage implements OnInit {

 

  constructor() {
    addIcons({ eyeOutline, lockClosedOutline,eyeOffOutline})
  }
  nome: string = "";
  email: string = "";
  senha: string = "";
  valor: any = "eye-outline";
  
  mudarVisibilidade(input:any){
    if(input.type == "password"){
      input.type = "text";
    }else{
      input.type = "password";
    }
    this.valor = (input.type == "password") ? "eye-outline" : "eye-off-outline";
  }


  ngOnInit() {
  }

}
