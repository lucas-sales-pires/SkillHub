import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { addIcons } from 'ionicons';
import { addOutline,trashOutline } from 'ionicons/icons';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { IonButton, IonContent, IonItem, IonLabel, IonTitle, IonCardSubtitle, IonCardContent, IonCard ,IonSelect,IonSelectOption, IonIcon, IonInput, IonCardTitle, IonCardHeader, IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
    selector: 'app-gerenciar-perguntas',
    templateUrl: './gerenciar-perguntas.page.html',
    styleUrls: ['./gerenciar-perguntas.page.scss'],
    standalone: true,
    imports: [IonToolbar, IonHeader, IonCardHeader, IonCardTitle, IonInput, IonIcon, IonCard, IonCardContent, IonCardSubtitle, IonTitle, IonLabel, IonItem, IonContent, IonButton, CommonModule, FormsModule, NavbarComponent, IonSelect, IonSelectOption, ModalComponent]
})
export class GerenciarPerguntasPage implements OnInit {

  categoria:string = '';
  pergunta: string = '';
  resposta1:string='';
  resposta2:string='';
  resposta3:string='';
  categoria1:string='';
  categoria2:string='';
  categoria3:string='';
  categorias:string[] = [];
  perguntas:any[] = [];
  

  constructor(private quiz:QuizService) { 
    addIcons({addOutline,trashOutline});
  }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPerguntas();
  }
  async carregarCategorias(){
    const perguntas = await this.quiz.obterPerguntas();
    perguntas.forEach(pergunta => {
      this.categorias.push(pergunta.categoria)
    })
    this.categorias  = this.categorias.filter((item,index) => this.categorias.indexOf(item) === index)  
  }
  async carregarPerguntas(){
    const perguntas = await this.quiz.obterPerguntas();
    perguntas.forEach(pergunta => {
      this.perguntas.push(pergunta.pergunta)
    }
    )
    this.perguntas = this.perguntas.filter((item,index) => this.perguntas.indexOf(item) === index)
  }
  
  
}
