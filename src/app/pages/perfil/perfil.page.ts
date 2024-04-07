import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Dados } from 'src/app/services/dados/dados.service';
import { getAuth } from 'firebase/auth';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

export class PerfilPage implements OnInit {
  nome: string = '';
  email: any = '';
  senha: string = '';
  cadastradoDesde: string = '';
  editar = 'false';
  sair = 'false';
  
  constructor(private dados: Dados) {}
  
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
        this.senha = usuario['senha']; 
        this.cadastradoDesde = usuario['diaCadastro']; 
      }
    } else {
      console.log('Nenhum usuário está atualmente logado');
    }
  }
}
