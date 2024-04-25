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
  
  contador30segundos() {
    let contador = 0;
    const incremento = 100 / 30; // Incremento necessário para chegar a 100 em 30 segundos
    clearInterval(this.intervalo); // Cancela o intervalo anterior, se houver

    this.intervalo = setInterval(() => {
        contador += incremento;
        this.cronometro.set(Math.round(contador)); // Arredonda o contador para o número inteiro mais próximo
        if (contador >= 100) { // Verifica se o contador atingiu 100 isso pra preencher o círculo
            clearInterval(this.intervalo); // Cancela o intervalo
            alert("Acabou o tempo!.");
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
    valor += 1
    this.valorAtual.set(valor);
  }

  setPontuacao() {
    this.pontuacao += 1;
  }

  getPontuacao(): number {
    return this.pontuacao;
  }
  async getQuantidadePerguntas() {  
    const perguntas = await this.quiz.obterPerguntasPorCategoria(this.quiz.getCategoria());
    return perguntas.length;
  }
  
}
