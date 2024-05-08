import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonButton,
} from '@ionic/angular/standalone';
import { PontuacaoService } from 'src/app/services/pontuacao/pontuacao.service';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { RankingService } from 'src/app/services/ranking/ranking.service';
import { Dados } from 'src/app/services/dados/dados.service';
import { Ranking } from 'src/app/interfaces/interfaceRanking';
@Component({
  selector: 'app-pagina-pontuacao-quiz',
  templateUrl: './pagina-pontuacao-quiz.page.html',
  styleUrls: ['./pagina-pontuacao-quiz.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonText,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    CommonModule,
    FormsModule,
    NavbarComponent,
  ],
})
export class PaginaPontuacaoQuizPage implements OnInit {
  pontuacao: number = 0;
  quantidade: any;
  usuario: any;
  rankingComDados: Ranking[]=[];

  constructor(
    private pontuacaoService: PontuacaoService,
    private service: AuthService,
    private ranking: RankingService,
  ) {}

  async ngOnInit() {
    await this.service.buscarUsuario().then((resultado)=>
    {
      this.usuario = resultado;
    }
    ); // Busco o usuário

    this.pontuacao = this.pontuacaoService.getPontuacao(); // Pego a pontuacao
    await this.pontuacaoService.getQuantidadePerguntas().then((quantidade) => {
      this.quantidade = quantidade;
    });

  this.rankingComDados = [
    { email: this.usuario.email,
      posicao: 0,
      nome: this.usuario.nome,
      pontuacao: this.pontuacao
    },
  ];
  // Pego o ranking

    this.ranking.adicionarJogadorAoRanking(this.rankingComDados[0]); // Adiciono o jogador ao ranking
  
  }; 

}
