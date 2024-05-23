import { Component, effect, OnInit, ViewChild } from '@angular/core';
import {IonHeader,IonToolbar,IonContent,IonItem,IonButton,IonModal,IonButtons,IonTitle,IonInput,IonLabel,IonIcon,IonList,IonRadio,IonRadioGroup,IonSelectOption,IonCheckbox,IonSelect, IonText } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AcordoService } from 'src/app/services/acordo/acordo.service';

@Component({
  selector: 'app-modal-acordo',
  templateUrl: './modal-acordo.component.html',
  styleUrls: ['./modal-acordo.component.scss'],
  standalone: true,
  imports: [IonText, IonCheckbox,IonRadioGroup,IonRadio,IonList,IonIcon,IonLabel,IonInput,IonTitle,IonButtons,IonModal,IonHeader,IonToolbar,IonContent,IonItem,IonButton,FormsModule,IonSelectOption,IonSelect,
  ],
})

export class ModalAcordoComponent {
  
termo: any;
@ViewChild(IonModal)
modal!: IonModal;


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


}
