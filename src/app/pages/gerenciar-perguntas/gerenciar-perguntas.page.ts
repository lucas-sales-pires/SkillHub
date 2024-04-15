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
  selecionada: string = '';
  catSelecionada:string = '';
  dados:any[] = [];
  

  constructor(private quiz:QuizService) { 
    addIcons({addOutline,trashOutline});
  }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPerguntas();
  }
  
  async carregarCategorias(){
    const perguntas = await this.quiz.obterPerguntas(); // Obtenho perguntas e resposta
    perguntas.forEach(pergunta => { // Primeira pergunta
      this.categorias.push(pergunta.categoria) // a lista de categoria pega só pergunta
    })
    this.categorias  = this.categorias.filter((item,index) => this.categorias.indexOf(item) === index) // Pego só uma por categoria, pega só o primeiro indice daquela categoria
    
  }
  async carregarPerguntas(){
    const perguntas = await this.quiz.obterPerguntas(); // Obtenho perguntas e respostas
    this.perguntas = perguntas // This.perguntas recebe tanto perguntas quanto respostas 
  }
  
  async removerPerguntas(selecionada:string){
    const id = await this.quiz.pegarIdDaPergunta(selecionada); // Pego o id da pergunta selecionada
    this.quiz.removerPergunta(id!); // Remove a pergunta
    this.perguntas = this.perguntas.filter(pergunta => pergunta !== selecionada); // Removo a pergunta baseado na selecionada
    this.carregarPerguntas(); // Carrego novamente as perguntas
  }
  
}
