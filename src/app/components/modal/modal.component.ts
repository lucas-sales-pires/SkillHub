import { Component, ViewChild,OnInit} from '@angular/core';
import {  OverlayEventDetail } from '@ionic/core/components';
import { IonHeader, IonToolbar, IonContent, IonItem, IonButton,IonModal, IonButtons, IonTitle, IonInput, IonLabel, IonIcon, IonList, IonRadio, IonRadioGroup,IonSelectOption, IonCheckbox, IonSelect } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { Pergunta } from '../perguntas/interfacePerguntas';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonCheckbox, IonRadioGroup, IonRadio, IonList, IonIcon, IonLabel, IonInput, IonTitle, IonButtons, IonModal, IonHeader, IonToolbar, IonContent, IonItem, IonButton,FormsModule,IonSelectOption,IonSelect],
  
})
export class ModalComponent  implements OnInit {


  categoria:string = '';
  pergunta: string = '';
  resposta1:string='';
  resposta2:string='';
  resposta3:string='';
  respostaCerta:string= '';

  
  @ViewChild(IonModal) 
  modal!: IonModal;

  constructor(private quiz:QuizService,private router:Router) {
    addIcons({addCircleOutline});
   }

  ngOnInit() {}



  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  adicionarPergunta() {
    const novaPergunta: Pergunta = {
      categoria:this.categoria,
      pergunta: this.pergunta,
      respostas: [this.resposta1, this.resposta2, this.resposta3],
      respostaCerta: this.respostaCerta
    };
    this.quiz.adicionarPergunta(novaPergunta)
    .then(() => {
      console.log('Pergunta adicionada com sucesso!');
      console.log(this.categoria)
      window.location.href = '/gerenciar-perguntas';
    })
    .catch((error) => {
      console.error('Erro ao adicionar pergunta:', error);
    });
    
  }
  
  funcaoCheckBox(opcao: string) {
    if (this.respostaCerta === opcao) {
      this.respostaCerta = '';
    } else {
      this.respostaCerta = opcao; 
    }
  }


  
}
