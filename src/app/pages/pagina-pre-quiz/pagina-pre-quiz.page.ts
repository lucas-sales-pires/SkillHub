import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
    selector: 'app-pagina-pre-quiz',
    templateUrl: './pagina-pre-quiz.page.html',
    styleUrls: ['./pagina-pre-quiz.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, NavbarComponent]
})
export class PaginaPreQuizPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
