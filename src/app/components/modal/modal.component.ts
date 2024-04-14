import { Component, ViewChild,OnInit} from '@angular/core';
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

  
  @ViewChild(IonModal) //@ViewChild: Essa anotação indica ao Angular que você deseja buscar um elemento específico na sua visualização. No caso, IonModal é o tipo de elemento que você deseja acessar.


  modal!: IonModal; //O sinal de exclamação (!) indica ao Angular que a variável modal não pode ser nula. Isso significa que você tem certeza de que o elemento modal estará presente na sua visualização.

  constructor(private quiz:QuizService,private router:Router) {
    addIcons({addCircleOutline});
   }

  ngOnInit() {}

  name: string = '';


  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }


  adicionarPergunta() {
    const novaPergunta: Pergunta = { // A nova pergunta é do tipo intergace Pergunta
      categoria:this.categoria,
      pergunta: this.pergunta,
      respostas: [this.resposta1, this.resposta2, this.resposta3],
      respostaCerta: this.respostaCerta
    };
    this.quiz.adicionarPergunta(novaPergunta) // Utilizo a funcao do service quiz para adicionar a nova pergunta
    .then(() => {
      console.log('Pergunta adicionada com sucesso!');
      window.location.href = '/gerenciar-perguntas';
    })
    .catch((error) => {
      console.error('Erro ao adicionar pergunta:', error);
    });
    
  }
}
