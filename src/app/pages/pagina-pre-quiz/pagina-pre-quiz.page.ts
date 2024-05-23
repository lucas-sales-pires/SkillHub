import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { ModalQuantidadeComponent } from 'src/app/components/modal-quantidade/modal-quantidade.component';

@Component({
    selector: 'app-pagina-pre-quiz',
    templateUrl: './pagina-pre-quiz.page.html',
    styleUrls: ['./pagina-pre-quiz.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, ModalQuantidadeComponent]
})
export class PaginaPreQuizPage {

  constructor(
    private quiz: QuizService,
    private modalController: ModalController,
  ) { }

  async selecionarCategoria(categoria: string) {
    this.quiz.setCategoria(categoria);
    const modal = await this.modalController.create({
      component: ModalQuantidadeComponent, 
      
    });
    await modal.present();
  }

}
