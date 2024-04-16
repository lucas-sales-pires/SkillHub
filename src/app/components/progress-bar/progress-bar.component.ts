import { Component, OnInit,effect } from '@angular/core';
import { IonContent,IonIcon, IonCard, IonRadioGroup, IonRadio, IonInput, IonButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { PerguntasComponent } from '../perguntas/perguntas.component';
import { PontuacaoService } from 'src/app/services/pontuacao/pontuacao.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
    standalone: true,
    imports: [IonButton, IonInput, IonRadio, IonRadioGroup, IonCard, IonContent, IonIcon, PerguntasComponent, NavbarComponent]
})
export class ProgressBarComponent  implements OnInit {
  valorAtual:any 
  qntPerguntas:number = 0;
  porcentagem :number=0;
  cronometro:any 
  regredir:any
  ;


  constructor(private pontuacao:PontuacaoService) { 
    addIcons({closeOutline})
    effect(()=>{
      this.valorAtual = this.pontuacao.valorAtual() // valor atual
      this.porcentagem = (this.valorAtual / this.qntPerguntas) * 100 // porcentagem da barra
      this.cronometro = this.pontuacao.cronometro() // cronometro recebe o valor do cronometro que esta no service
      this.regredir = this.pontuacao.regredir() // regredir recebe o valor do regredir que esta no service
    })
  }
  
  
  
  ngOnInit() {
    this.pontuacao.getQuantidadePerguntas().then(perguntas =>  this.qntPerguntas = perguntas ) // pega a quantidade de perguntas

  }

}
