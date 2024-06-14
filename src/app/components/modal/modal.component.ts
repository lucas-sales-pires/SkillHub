import { Component, ViewChild, OnInit } from '@angular/core';
import {IonHeader,IonToolbar,IonContent,IonItem,IonButton,IonModal,IonButtons,IonTitle,IonInput,IonLabel,IonIcon,IonList,IonRadio,IonRadioGroup,IonSelectOption,IonCheckbox,IonSelect,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { Pergunta } from '../../interfaces/interfacePerguntas';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonCheckbox,IonRadioGroup,IonRadio,IonList,IonIcon,IonLabel,IonInput,IonTitle,IonButtons,IonModal,IonHeader,IonToolbar,IonContent,IonItem,IonButton,FormsModule,IonSelectOption,IonSelect,
  ],
})
export class ModalComponent {
  categoria: string = '';
  pergunta: string = '';
  resposta1: string = '';
  resposta2: string = '';
  resposta3: string = '';
  respostaCerta: string = '';
  perguntasCadastradas: any;
  arquivoSelecionado: any;
  @ViewChild(IonModal)
  modal!: IonModal; 
  name: string = '';

  constructor(private quiz: QuizService, private router: Router,private toast: ToastController) {
    addIcons({ addCircleOutline });
  }


  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  adicionarPergunta() {
    const novaPergunta: Pergunta = {
      categoria: this.categoria,
      pergunta: this.pergunta,
      respostas: [this.resposta1, this.resposta2, this.resposta3],
      respostaCerta: this.respostaCerta,
    };
    this.quiz
      .adicionarPergunta(novaPergunta)
      .then(() => {
        this.mostrarToast(true,'Pergunta adicionada com sucesso!');
        this.router.navigateByUrl('/gerenciar-perguntas');
      })
      .catch((error) => {
        this.mostrarToast(false,'Erro ao adicionar pergunta!'); 
        console.error('Erro ao adicionar pergunta:', error);
      });
  }
  selecionarArquivo(event: any) {
    this.arquivoSelecionado = event.target.files[0];
  }

  async enviarJson() {
    if (!this.arquivoSelecionado) {
      alert('Selecione um arquivo JSON!');
      this.mostrarToast(false,'Selecione um arquivo JSON!');  
      return;
    }
    const arquivo = this.arquivoSelecionado; 
    const reader = new FileReader(); 
    this.perguntasCadastradas = (await this.quiz.obterPerguntas()).map(
      (p) => p.pergunta
    ); 
    reader.onload = (e: any) => {
      const jsonConteudo = e.target.result; 
      try {
        const perguntas: Pergunta[] = JSON.parse(jsonConteudo); 

        perguntas.forEach((pergunta, index) => {
          if (this.perguntasCadastradas.includes(pergunta.pergunta)) {
            this.mostrarToast(false,`Pergunta ${index + 1} já cadastrada!`);
            return;
          }

          this.quiz
            .adicionarPergunta(pergunta)
            .then(() => {
              this.mostrarToast(true,`Pergunta ${index + 1} adicionada com sucesso!`);
              if (index === perguntas.length - 1) {
                this.router.navigateByUrl('/gerenciar-perguntas');
              }
            })
            .catch((error) => {
              this.mostrarToast(false,`Erro ao adicionar pergunta ${index + 1}!`);
            });
        });
      } catch (error) {
        this.mostrarToast(false,'Erro ao analisar o arquivo JSON!');
      }
    };

    reader.readAsText(arquivo);
  }

  async mostrarToast(sucesso: boolean,msg:string) {
    const toast = await this.toast.create({
      message: sucesso ? msg : msg,
      duration: 2000,
      color: sucesso ? 'success' : 'danger', 
     position: "middle",
    });
    await toast.present();
  }
  
}
