import { Component, OnInit } from '@angular/core';
import { IonContent,IonIcon, IonCard, IonRadioGroup, IonRadio, IonInput, IonButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { PerguntasComponent } from '../perguntas/perguntas.component';




@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonRadio, IonRadioGroup, IonCard, IonContent, IonIcon,PerguntasComponent]
})
export class ProgressBarComponent  implements OnInit {

  constructor() { addIcons({closeOutline})


   }

  ngOnInit() {}

}
