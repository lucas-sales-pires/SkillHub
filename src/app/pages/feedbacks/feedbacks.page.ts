import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Dados } from 'src/app/services/dados/dados.service';

@Component({
    selector: 'app-feedbacks',
    templateUrl: './feedbacks.page.html',
    styleUrls: ['./feedbacks.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, NavbarComponent]
    })
    export class FeedbacksPage implements OnInit{
  constructor(private buscarDados : Dados) { 
    
  }
  usuarios:any[] = [];
  feedbacks:any[] = [];
async ngOnInit() {
  this.usuarios = [...await this.buscarDados.PegarTodosUsuarios()]; 
  this.feedbacks =[... await this.buscarDados.BuscarFeedbacks()]

  this.feedbacks.forEach((feedback) => {
    this.usuarios.forEach((usuario) => {
      if(feedback.email == usuario.email ){
        feedback.nome = usuario.nome
        feedback.foto = usuario.foto

      }
      
    })
  })


}

  




}
