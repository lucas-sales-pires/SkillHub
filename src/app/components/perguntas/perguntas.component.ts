import { Component, effect, OnInit } from '@angular/core';
import {IonContent,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonList,IonItem,IonLabel,IonRadioGroup,IonRadio,IonButton,IonInput,IonCheckbox,
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
  imports: [IonCheckbox,IonInput,IonButton,IonRadio,IonRadioGroup,IonLabel,IonItem,IonList,IonCardContent,IonCardTitle,IonCardHeader,IonCard,IonContent,FormsModule,NavbarComponent,
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
  
  ngOnInit() {
    this.obterperguntas();
    
  }
  
  constructor(
    private quiz: QuizService,
    private router: Router,
    private pontuacaoService: PontuacaoService
  ) {
    effect(() => {
      this.categoriaEscolhida = this.quiz.getCategoria();
      this.pontuacaoService.regredir() == 0 ? this.proximaPergunta() : null;
    });
  }

  voltar() {
    this.router.navigate(['/pagina-pre-quiz']);
    this.quiz.setCategoria('vazio');
  }

  async obterperguntas() {
 
    let perguntas = await this.quiz.obterPerguntasPorCategoria(
      this.quiz.getCategoria(),this.quiz.quantidadePerguntasPorCategoria()
    );
    if (perguntas.length == 0) {
      this.quiz.setCategoria('vazio');
      return;
    }
 
    this.perguntaAtual = perguntas[this.indice]['pergunta']; 
    this.respostas0 = perguntas[this.indice]['respostas'][0];
    this.respostas1 = perguntas[this.indice]['respostas'][1];
    this.respostas2 = perguntas[this.indice]['respostas'][2];
    this.respostacorreta = perguntas[this.indice]['respostaCerta'];
    
    this.pontuacaoService.regredir30segundos();
    this.pontuacaoService.contador30segundos();
  }
   async proximaPergunta() {
    if(this.respostaSelecionada == this.respostacorreta){
      this.pontuacaoService.setPontuacao(); 
    }
    this.indice += 1;
    let perguntas = await this.quiz.obterPerguntasPorCategoria(
      this.quiz.getCategoria(),this.quiz.quantidadePerguntasPorCategoria()
    );
    if (this.indice < perguntas.length) {
      this.perguntaAtual = perguntas[this.indice]['pergunta'];
      this.respostas0 = perguntas[this.indice]['respostas'][0];
      this.respostas1 = perguntas[this.indice]['respostas'][1];
      this.respostas2 = perguntas[this.indice]['respostas'][2];
      this.respostacorreta = perguntas[this.indice]['respostaCerta'];
      this.pontuacaoService.setValorAtual(this.indice); 
      this.pontuacaoService.contador30segundos();
      this.pontuacaoService.regredir30segundos();
      
    } else {
      this.router.navigate(['/pagina-pontuacao-quiz']);
    }
  }

  async apenasUm() {
    const checkboxs = document.querySelectorAll('ion-checkbox');
    checkboxs.forEach((checkbox) => {
      checkbox.addEventListener('ionChange', async (e) => {
        const checkbox = e.target; 
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
  this.respostaSelecionada = respostaSelecionada;

}
}
