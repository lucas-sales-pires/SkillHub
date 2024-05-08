import { Injectable } from '@angular/core';
import { Ranking } from 'src/app/interfaces/interfaceRanking';
import { Dados } from '../dados/dados.service';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  public jogadores: Ranking[] = [];
  
  constructor(private dados:Dados) {}

  adicionarJogadorAoRanking(ranking:Ranking) {
    const jogador = { ...ranking };
    this.jogadores.push(jogador);
    this.dados.EnviarParaRanking(jogador);

  }


  getRanking() {
    return this.jogadores;
  }


}
