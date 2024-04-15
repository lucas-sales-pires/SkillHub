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
    this.obterperguntas() //Assim que inicia já carrega esta função
  }


  async obterperguntas(){
    let perguntas = await this.quiz.obterPerguntas() // Espera obter as perguntas
    this.perguntaAtual = perguntas[this.indice]["pergunta"] // Depois que carrega os dados, pega a pergunta e os demais dados
    this.respostas0 = perguntas[this.indice]["respostas"][0]
    this.respostas1 = perguntas[this.indice]["respostas"][1]
    this.respostas2 = perguntas[this.indice]["respostas"][2]
    this.respostacorreta = perguntas[this.indice]["respostaCerta"] 
  }
  async proximaPergunta(){
    this.indice += 1 // Quando apertar em proxima pergunta o indice aumenta um para ir para proxima pergunta e respostas
    let perguntas = await this.quiz.obterPerguntas() // Obtem as perguntas de novo
    if (this.indice < perguntas.length) { // Se o indice for menor que o tamanho da lista
      this.perguntaAtual = perguntas[this.indice]["pergunta"]; // Prossigo em buscar os dados 
      this.respostas0 = perguntas[this.indice]["respostas"][0];
      this.respostas1 = perguntas[this.indice]["respostas"][1];
      this.respostas2 = perguntas[this.indice]["respostas"][2];
      this.respostacorreta = perguntas[this.indice]["respostaCerta"];
      
    } else {
      this.router.navigate(['/pagina-pontuacao-quiz']);

    }

  }

  async apenasUm(){
    const checkboxs = document.querySelectorAll('ion-checkbox'); // Pega todos os ion-checkbox
    checkboxs.forEach((checkbox) => { // Para cada checkbox
      checkbox.addEventListener('ionChange', async (e) => { // Adiciona o event IonChange
        const checkbox = e.target; // Pega o target dele
        if (checkbox.checked) { // Se ele estiver Marcado
          checkboxs.forEach((cb) => { //Aqui, estamos iterando sobre todos os checkboxes novamente para desmarcar todos
            if (cb !== checkbox) {//  exceto o que foi marcado recentemente.
              cb.checked = false; 
            }
          });
          this.opcaoSelecionada = checkbox.value;// Opcao selecionada recebe o valor do checkbox
   
        }
      });
    });
  }
  verificarResposta(respostaSelecionada: string) {
    if (respostaSelecionada === this.respostacorreta) { // Se a resposta selecionada for igual a resposta correta
      this.pontuacaoService.setPontuacao(this.pontuacao += 1); // Eu seto a pontuacao com mais 1
    }
    else{
      console.log(respostaSelecionada)
    }
  }
  
  
}
