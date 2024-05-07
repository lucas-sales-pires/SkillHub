import { Component, effect, OnInit, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonButton,
  IonModal,
  IonButtons,
  IonTitle,
  IonInput,
  IonLabel,
  IonIcon,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonSelectOption,
  IonCheckbox,
  IonSelect, IonText } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AcordoService } from 'src/app/services/acordo/acordo.service';

@Component({
  selector: 'app-modal-acordo',
  templateUrl: './modal-acordo.component.html',
  styleUrls: ['./modal-acordo.component.scss'],
  standalone: true,
  imports: [IonText, 
    IonCheckbox,
    IonRadioGroup,
    IonRadio,
    IonList,
    IonIcon,
    IonLabel,
    IonInput,
    IonTitle,
    IonButtons,
    IonModal,
    IonHeader,
    IonToolbar,
    IonContent,
    IonItem,
    IonButton,
    FormsModule,
    IonSelectOption,
    IonSelect,
  ],
})

export class ModalAcordoComponent  implements OnInit {

termo: any;


@ViewChild(IonModal) //@ViewChild: Essa anotação indica ao Angular que você deseja buscar um elemento específico na sua visualização. No caso, IonModal é o tipo de elemento que você deseja acessar.
modal!: IonModal; //O sinal de exclamação (!) indica ao Angular que a variável modal não pode ser nula. Isso significa que você tem certeza de que o elemento modal estará presente na sua visualização.
constructor(termos: AcordoService) { 
  effect(() => {
    this.termo = termos.termo;
  });
}

aceitarTermos() {
  this.termo.set(true);
  this.modal.dismiss();
}
recusarTermos() {
  this.modal.dismiss();
}

  ngOnInit() {
  }

}
