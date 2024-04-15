import { Injectable, signal } from '@angular/core';
import { QuizService } from '../quiz/quiz.service';

@Injectable({
  providedIn: 'root'
})
export class PontuacaoService {
  private pontuacao: number = 0;
  public valorAtual = signal(1);
  public cronometro = signal(0);
  public intervalo: any;
  public intervalo2: any;
  public regredir = signal(30);
  
  constructor(private quiz:QuizService) { }
  
  
  contador30segundos(){
    let contador = 0;
    clearInterval(this.intervalo); // Cancela o intervalo anterior, se houver

    this.intervalo = setInterval(() => {
        contador++;
        this.cronometro.set(contador);
        if (contador >= 30) {
            clearInterval(this.intervalo); // Cancela o intervalo após 30 segundos
            alert("acabou o tempo")
        }
    }, 1000); // Chama a função a cada segundo
  }
  regredir30segundos(){
    let contador = 30;
    clearInterval(this.intervalo2); // Cancela o intervalo anterior, se houver

    this.intervalo2 = setInterval(() => {
        contador--;
        this.regredir.set(contador);
        if (contador <= 0) {
            clearInterval(this.intervalo2); // Cancela o intervalo após 30 segundos
            alert("acabou o tempo")
        }
    }, 1000); // Chama a função a cada segundo
  }

  
  getValorAtual(): number {
    return this.valorAtual();
  }

  setValorAtual(valor: number) {
    this.valorAtual.set(valor+1);
  }

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
