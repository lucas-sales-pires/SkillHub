import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonButton,
  IonInput, IonCheckbox } from '@ionic/angular/standalone';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { FormsModule } from '@angular/forms';
import { Pergunta } from './interfacePerguntas';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.scss'],
  standalone: true,
  imports: [IonCheckbox, 
    IonInput,
    IonButton,
    IonRadio,
    IonRadioGroup,
    IonLabel,
    IonItem,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    FormsModule
  ],
})
export class PerguntasComponent implements OnInit {
  perguntaAtual:string = '';
  pergunta: string = '';
  respostas0:string = ''
  respostas1:string = ''
  respostas2:string = ''
  resposta1:string='';
  resposta2:string='';
  resposta3:string='';
  opcaoSelecionada:string='';
  indice:number = 0;

  
  constructor(private quiz: QuizService) {}

  ngOnInit() {}

  adicionarPergunta() {
    const novaPergunta: Pergunta = {
      id:1,
      pergunta: this.pergunta,
      respostas: [this.resposta1, this.resposta2, this.resposta3]
    };
    this.quiz.adicionarPergunta(novaPergunta)
    .then(() => {
      console.log('Pergunta adicionada com sucesso!');
      this.pergunta = '';
      this.resposta1 = '';
      this.resposta2 = '';
      this.resposta3 = '';
    })
    .catch((error) => {
      console.error('Erro ao adicionar pergunta:', error);
    });
  }
  async obterperguntas(){
    let perguntas = await this.quiz.obterPerguntas()
    this.perguntaAtual = perguntas[0]["pergunta"]
    this.respostas0 = perguntas[0]["respostas"][0]
    this.respostas1 = perguntas[0]["respostas"][1]
    this.respostas2 = perguntas[0]["respostas"][2]
    console.log(perguntas)
  }
  async proximaPergunta(){
    this.indice = this.indice + 1
    let perguntas = await this.quiz.obterPerguntas()
    this.perguntaAtual = perguntas[this.indice]["pergunta"]
    this.respostas0 = perguntas[this.indice]["respostas"][0]
    this.respostas1 = perguntas[this.indice]["respostas"][1]
    this.respostas2 = perguntas[this.indice]["respostas"][2]

  }
 

  funcaoCheckBox(opcao: string) {
    if (this.opcaoSelecionada === opcao) {
      this.opcaoSelecionada = '';
    } else {
      this.opcaoSelecionada = opcao; 
    }
  }
  
}
