import { Injectable } from '@angular/core';
import { Ranking } from 'src/app/interfaces/interfaceRanking';
import { Dados } from '../dados/dados.service';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  
  constructor(private dados:Dados) {}

  adicionarJogadorAoRanking(ranking:Ranking) {
    const jogador = { ...ranking };
    this.dados.enviarParaRanking(jogador);

  }



}
