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
  
  ngOnInit() {
    this.carregarCategorias();
    this.carregarPerguntas();
  }

  constructor(private quiz:QuizService) { 
    addIcons({addOutline,trashOutline});
  }

  async carregarCategorias(){
    const perguntas = await this.quiz.obterPerguntas(); 
    perguntas.forEach(pergunta => {
      this.categorias.push(pergunta.categoria) 
    })
    this.categorias = this.removerDuplicadas(this.categorias);
  }

  public removerDuplicadas(array:any[]){
    return array.filter((item,index) => array.indexOf(item) === index)
  }

  async carregarPerguntas(){
    const perguntas = await this.quiz.obterPerguntas(); 
    this.perguntas = perguntas;
  }
  
  async removerPerguntas(selecionada:string){
    const id = await this.quiz.pegarIdDaPergunta(selecionada); 
    this.quiz.removerPergunta(id!);
    this.perguntas = this.perguntas.filter(pergunta => pergunta !== selecionada);
    this.carregarPerguntas();
  }
  
}
