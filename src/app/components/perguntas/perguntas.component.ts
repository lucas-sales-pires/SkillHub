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
import { Router } from '@angular/router';
import { PontuacaoService } from 'src/app/services/pontuacao/pontuacao.service';

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
  categoria:string = '';
  pergunta: string = '';
  respostas0:string = ''
  respostas1:string = ''
  respostas2:string = ''
  resposta1:string='';
  resposta2:string='';
  resposta3:string='';
  respostacorreta:string= '';
  opcaoSelecionada:string='';
  indice:number = 0;
  pontuacao:number = 0;


  
  constructor(private quiz: QuizService,private router:Router,private pontuacaoService: PontuacaoService) {}

  ngOnInit() {
    this.obterperguntas()
  }


  async obterperguntas(){
    let perguntas = await this.quiz.obterPerguntas()
    this.perguntaAtual = perguntas[this.indice]["pergunta"]
    this.respostas0 = perguntas[this.indice]["respostas"][0]
    this.respostas1 = perguntas[this.indice]["respostas"][1]
    this.respostas2 = perguntas[this.indice]["respostas"][2]
    this.respostacorreta = perguntas[this.indice]["respostaCerta"]
    console.log(perguntas)
  }
  async proximaPergunta(){
    this.indice += 1
    let perguntas = await this.quiz.obterPerguntas()
    if (this.indice < perguntas.length) {
      this.perguntaAtual = perguntas[this.indice]["pergunta"];
      this.respostas0 = perguntas[this.indice]["respostas"][0];
      this.respostas1 = perguntas[this.indice]["respostas"][1];
      this.respostas2 = perguntas[this.indice]["respostas"][2];
      this.respostacorreta = perguntas[this.indice]["respostaCerta"];
    } else {
      console.error("Índice excedeu o limite do array de perguntas.");
      this.router.navigate(['/pagina-pontuacao-quiz']);

    }

  }

  async apenasUm(){
    const checkboxs = document.querySelectorAll('ion-checkbox');
    checkboxs.forEach((checkbox) => {
      checkbox.addEventListener('ionChange', async (e) => {
        const checkbox = e.target as HTMLIonCheckboxElement;
        if (checkbox.checked) {
          checkboxs.forEach((cb) => {
            if (cb !== checkbox) {
              cb.checked = false;
            }
          });
          this.opcaoSelecionada = checkbox.value;
   
        }
      });
    });
  }
  verificarResposta(respostaSelecionada: string) {
    if (respostaSelecionada === this.respostacorreta) {
      console.log("Resposta correta");
      this.pontuacaoService.setPontuacao(this.pontuacao += 1);
    }
    else{
      console.log(respostaSelecionada)
    }
  }
  
  
}
