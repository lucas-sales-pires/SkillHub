import { Component, OnInit } from '@angular/core';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.scss'],
  standalone: true,
  imports: [IonButton, IonRadio, IonRadioGroup, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent]
})
export class PerguntasComponent  implements OnInit {
  pergunta = "Qual é a capital do Brasil?";
  constructor() { 
    

  }

  ngOnInit() {}

}
