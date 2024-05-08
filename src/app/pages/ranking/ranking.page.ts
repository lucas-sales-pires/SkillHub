import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Dados } from 'src/app/services/dados/dados.service';
import { Ranking } from 'src/app/interfaces/interfaceRanking';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent],
})
export class RankingPage implements OnInit {

  jogadores: Ranking[] = [];
  

  constructor(private ranking: Dados) {}
  ordenarRanking() {
    this.jogadores.sort((a, b) => b.pontuacao - a.pontuacao); // Ordena do maior para o menor
    this.jogadores.forEach((jogador, index) => {
      jogador.posicao = index + 1; // Define a posição do jogador com base no índice + 1
    });
  }

  ngOnInit() {
    this.ranking.PegarRanking().then((resultado: any) => {
      this.jogadores = resultado;
      this.ordenarRanking();
      console.log(this.jogadores)
    });


}
}
