import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonCardContent,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonRadio,
  IonFooter,
  IonButtons,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-quantidade',
  templateUrl: './modal-quantidade.component.html',
  styleUrls: ['./modal-quantidade.component.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonFooter,
    IonRadio,
    IonLabel,
    IonItem,
    IonRadioGroup,
    IonCardContent,
    IonList,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonModal,
    IonButton,
    IonIcon,
    FormsModule,
  ],
})
export class ModalQuantidadeComponent implements OnInit {
  valor: any;

  @ViewChild(IonModal) //@ViewChild: Essa anotação indica ao Angular que você deseja buscar um elemento específico na sua visualização. No caso, IonModal é o tipo de elemento que você deseja acessar.
  modal!: IonModal; //O sinal de exclamação (!) indica ao Angular que a variável modal não pode ser nula. Isso significa que você tem certeza de que o elemento modal estará presente na sua visualização.

  constructor(private service: QuizService, private router: Router, private modalController: ModalController) {
  }

  async confirmar() {
    this.service.quantidadePerguntasPorCategoria.set(this.valor);
    this.modalController.dismiss(this.valor);
    this.router.navigate(['/quiz']); // Redireciona para o quiz
  }
  

  fecharModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {}
}
