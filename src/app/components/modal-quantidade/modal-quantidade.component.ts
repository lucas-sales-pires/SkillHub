import { Component, OnInit, ViewChild } from '@angular/core';
import {IonButton,IonIcon,IonModal,IonHeader,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,IonList,IonCardContent,IonRadioGroup,IonItem,IonLabel,IonRadio,IonFooter,IonButtons,
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
  imports: [IonButtons,IonFooter,IonRadio,IonLabel,IonItem,IonRadioGroup,IonCardContent,IonList,IonCardTitle,IonCardHeader,IonCard,IonContent,IonTitle,IonToolbar,IonHeader,IonModal,IonButton,IonIcon,FormsModule,
  ],
})
export class ModalQuantidadeComponent {
  valor: any;
  @ViewChild(IonModal)
  modal!: IonModal;

  constructor(private service: QuizService, private router: Router, private modalController: ModalController) {
  }

  async confirmar() {
    this.service.quantidadePerguntasPorCategoria.set(this.valor);
    this.modalController.dismiss(this.valor);
    this.router.navigate(['/quiz']);
  }
  

  fecharModal() {
    this.modalController.dismiss();
  }
}
