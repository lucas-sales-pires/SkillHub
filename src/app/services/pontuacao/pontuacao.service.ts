import { Injectable, signal } from '@angular/core';
import { QuizService } from '../quiz/quiz.service';
import { EfeitosVisuaisService } from '../efeitos/efeitos-visuais.service';

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
  
  constructor(private quiz:QuizService,private efeitos:EfeitosVisuaisService) { }
  
  contador30segundos() {
    let contador = 0;
    const incremento = 100 / 30; 
    clearInterval(this.intervalo); 

    this.intervalo = setInterval(() => {
        contador += incremento;
        this.cronometro.set(Math.round(contador)); 
        if (contador >= 100) { 
            clearInterval(this.intervalo); 
        }
    }, 1000);
}




  regredir30segundos(){
    let contador = 30;
    clearInterval(this.intervalo2); 

    this.intervalo2 = setInterval(() => {
        contador--;
        this.regredir.set(contador);
        if (contador <= 0) {
            clearInterval(this.intervalo2); 
            this.efeitos.mostrarToast(false, "Tempo esgotado!, Passando para a próxima pergunta !")
        }
    }, 1000); 
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
    const perguntas = await this.quiz.obterPerguntasPorCategoria(this.quiz.getCategoria(),this.quiz.quantidadePerguntasPorCategoria());
    return perguntas.length;
  }
  
}
