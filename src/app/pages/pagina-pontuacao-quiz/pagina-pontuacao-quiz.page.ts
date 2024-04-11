import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonButton } from "@ionic/angular/standalone";
import { PontuacaoService } from 'src/app/services/pontuacao/pontuacao.service';

@Component({
    selector: 'app-pagina-pontuacao-quiz',
    templateUrl: './pagina-pontuacao-quiz.page.html',
    styleUrls: ['./pagina-pontuacao-quiz.page.scss'],
    standalone: true,
    imports: [IonButton, IonText, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonGrid, IonContent, CommonModule, FormsModule, NavbarComponent]
})
export class PaginaPontuacaoQuizPage implements OnInit {
  pontuacao: number = 0;
  quantidade: any;
  
  
  constructor(private pontuacaoService: PontuacaoService) { }
  
  async ngOnInit() {
    this.pontuacao = this.pontuacaoService.getPontuacao();
    this.quantidade = await this.pontuacaoService.getQuantidadePerguntas();
  }

}
