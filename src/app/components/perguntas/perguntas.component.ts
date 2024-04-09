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
  IonInput,
} from '@ionic/angular/standalone';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { FormsModule } from '@angular/forms';
import { Pergunta } from './interfacePerguntas';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.scss'],
  standalone: true,
  imports: [
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
  pergunta: string = '';
  resposta1:string='';
  resposta2:string='';
  resposta3:string='';
  constructor(private quiz: QuizService) {}

  ngOnInit() {}

  adicionarPergunta() {
    const novaPergunta: Pergunta = {
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
  
}
