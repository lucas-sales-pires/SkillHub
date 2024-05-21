import { Component, OnInit,effect, signal } from '@angular/core';
import { IonContent,IonIcon, IonCard, IonRadioGroup, IonRadio, IonInput, IonButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { PerguntasComponent } from '../perguntas/perguntas.component';
import { PontuacaoService } from 'src/app/services/pontuacao/pontuacao.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
    standalone: true,
    imports: [IonButton, IonInput, IonRadio, IonRadioGroup, IonCard, IonContent, IonIcon, PerguntasComponent, NavbarComponent]
})
export class ProgressBarComponent  implements OnInit {
  valorAtual:any; 
  qntPerguntas:number = 0;
  porcentagem :number = 0;
  cronometro:any; 
  regredir:any;

  constructor(private pontuacao:PontuacaoService,private quiz:QuizService) { 
    addIcons({closeOutline})
    effect(()=>{
      this.valorAtual = this.pontuacao.valorAtual() 
      this.porcentagem = this.qntPerguntas === 0 ? 0 : Math.floor((this.valorAtual / this.qntPerguntas) * 100);
      this.cronometro = this.pontuacao.cronometro() 
      this.regredir = this.pontuacao.regredir()
      
    })
  
  }

  voltar(){
    this.quiz.setCategoria('vazio')
  }
  
  ngOnInit() {
    this.pontuacao.getQuantidadePerguntas().then(perguntas =>  this.qntPerguntas = perguntas)
  }

}
