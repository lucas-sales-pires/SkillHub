import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent} from "../../components/navbar/navbar.component"
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar.component";
import { PerguntasComponent } from "../../components/perguntas/perguntas.component";
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, ProgressBarComponent, PerguntasComponent]
})
export class QuizPage {
  categoria = 'vazio';
  constructor(categoria:QuizService, private router:Router) {
    effect(() => {
    this.categoria = categoria.categoria()
    });
   }
   voltar(){
    this.router.navigate(['/pagina-pre-quiz']);
  }


}
