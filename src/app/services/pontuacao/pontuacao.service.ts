import { Injectable } from '@angular/core';
import { QuizService } from '../quiz/quiz.service';

@Injectable({
  providedIn: 'root'
})
export class PontuacaoService {
  private pontuacao: number = 0;

  constructor(private quiz:QuizService) { }

  setPontuacao(pontuacao: number) {
    this.pontuacao = pontuacao;
  }

  getPontuacao(): number {
    return this.pontuacao;
  }
  async getQuantidadePerguntas() {  
    const perguntas = await this.quiz.obterPerguntas();
    return perguntas.length;
  }
}
