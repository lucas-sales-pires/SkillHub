import { Component, effect, OnInit } from '@angular/core';
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
  IonCheckbox,
} from '@ionic/angular/standalone';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PontuacaoService } from 'src/app/services/pontuacao/pontuacao.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
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
    FormsModule,
    NavbarComponent,
  ],
})
export class PerguntasComponent implements OnInit {
  perguntaAtual: string = '';
  categoria: string = '';
  pergunta: string = '';
  respostas0: string = '';
  respostas1: string = '';
  respostas2: string = '';
  resposta1: string = '';
  resposta2: string = '';
  resposta3: string = '';
  respostacorreta: string = '';
  opcaoSelecionada: string = '';
  indice: number = 0;
  pontuacao: number = 0;
  categoriaEscolhida: any;
  respostaSelecionada: string = '';

  constructor(
    private quiz: QuizService,
    private router: Router,
    private pontuacaoService: PontuacaoService
  ) {
    effect(() => {
      this.categoriaEscolhida = this.quiz.getCategoria(); // Pega a categoria escolhida
      console.log(this.quiz.categoria());
    });
  }

  ngOnInit() {
    this.obterperguntas(); //Assim que inicia já carrega esta função
  }
  voltar() {
    this.router.navigate(['/pagina-pre-quiz']);
    this.quiz.setCategoria('vazio');
  }

  async obterperguntas() {
 
    let perguntas = await this.quiz.obterPerguntasPorCategoria(
      this.quiz.getCategoria()
    ); // Espera obter as perguntas
    if (perguntas.length == 0) {
      // Se não tiver perguntas
      this.quiz.setCategoria('vazio');
      return;
    }
 
    this.perguntaAtual = perguntas[this.indice]['pergunta']; // Depois que carrega os dados, pega a pergunta e os demais dados
    this.respostas0 = perguntas[this.indice]['respostas'][0];
    this.respostas1 = perguntas[this.indice]['respostas'][1];
    this.respostas2 = perguntas[this.indice]['respostas'][2];
    this.respostacorreta = perguntas[this.indice]['respostaCerta'];
    
    this.pontuacaoService.regredir30segundos(); // Inicia o regredir de 30 segundos
    this.pontuacaoService.contador30segundos(); // Inicia o contador de 30 segundos
  }
  async proximaPergunta() {
    if(this.respostaSelecionada == this.respostacorreta){
      this.pontuacaoService.setPontuacao(); // Soma 1 na pontuacao
    }
    this.indice += 1; // Quando apertar em proxima pergunta o indice aumenta um para ir para proxima pergunta e respostas
    let perguntas = await this.quiz.obterPerguntasPorCategoria(
      this.quiz.getCategoria()
    ); // Obtem as perguntas de novo
    if (this.indice < perguntas.length) {
      // Se o indice for menor que o tamanho da lista
      this.perguntaAtual = perguntas[this.indice]['pergunta']; // Prossigo em buscar os dados
      this.respostas0 = perguntas[this.indice]['respostas'][0];
      this.respostas1 = perguntas[this.indice]['respostas'][1];
      this.respostas2 = perguntas[this.indice]['respostas'][2];
      this.respostacorreta = perguntas[this.indice]['respostaCerta'];
      this.pontuacaoService.setValorAtual(this.indice); // Seto o valor atual do indice
      this.pontuacaoService.contador30segundos(); // Inicia o contador de 30 segundos
      this.pontuacaoService.regredir30segundos(); // Inicia o regredir de 30 segundos
      
    } else {
      this.router.navigate(['/pagina-pontuacao-quiz']);
    }
    console.log(this.pontuacaoService.getValorAtual()); // Pego o valor atual do indice
  }

  async apenasUm() {
    const checkboxs = document.querySelectorAll('ion-checkbox'); // Pega todos os ion-checkbox
    checkboxs.forEach((checkbox) => {
      // Para cada checkbox
      checkbox.addEventListener('ionChange', async (e) => {
        // Adiciona o event IonChange
        const checkbox = e.target; // Pega o target dele
        if (checkbox.checked) {
          // Se ele estiver Marcado
          checkboxs.forEach((cb) => {
            //Aqui, estamos iterando sobre todos os checkboxes novamente para desmarcar todos
            if (cb !== checkbox) {
              //  exceto o que foi marcado recentemente.
              cb.checked = false;
            }
          });
          this.opcaoSelecionada = checkbox.value; // Opcao selecionada recebe o valor do checkbox
        }
      });
    });
  }

verificarResposta(respostaSelecionada: string) {
  this.respostaSelecionada = respostaSelecionada;
  console.log(this.respostaSelecionada);
  console.log(this.pontuacaoService.getPontuacao());

}
}
