import { Component, ViewChild, OnInit } from '@angular/core';
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
  IonSelect,
} from '@ionic/angular/standalone';
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
  imports: [
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
export class ModalComponent implements OnInit {
  categoria: string = '';
  pergunta: string = '';
  resposta1: string = '';
  resposta2: string = '';
  resposta3: string = '';
  respostaCerta: string = '';
  perguntasCadastradas: any;
  arquivoSelecionado: any;

  @ViewChild(IonModal) //@ViewChild: Essa anotação indica ao Angular que você deseja buscar um elemento específico na sua visualização. No caso, IonModal é o tipo de elemento que você deseja acessar.
  modal!: IonModal; //O sinal de exclamação (!) indica ao Angular que a variável modal não pode ser nula. Isso significa que você tem certeza de que o elemento modal estará presente na sua visualização.

  constructor(private quiz: QuizService, private router: Router) {
    addIcons({ addCircleOutline });
  }

  ngOnInit() {}

  name: string = '';

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  adicionarPergunta() {
    const novaPergunta: Pergunta = {
      // A nova pergunta é do tipo intergace Pergunta
      categoria: this.categoria,
      pergunta: this.pergunta,
      respostas: [this.resposta1, this.resposta2, this.resposta3],
      respostaCerta: this.respostaCerta,
    };
    this.quiz
      .adicionarPergunta(novaPergunta) // Utilizo a funcao do service quiz para adicionar a nova pergunta
      .then(() => {
        console.log('Pergunta adicionada com sucesso!');
        this.router.navigateByUrl('/gerenciar-perguntas');
      })
      .catch((error) => {
        console.error('Erro ao adicionar pergunta:', error);
      });
  }
  selecionarArquivo(event: any) {
    this.arquivoSelecionado = event.target.files[0]; // Salva o arquivo selecionado em uma variável de classe
  }

  async enviarJson() {
    if (!this.arquivoSelecionado) {
      alert('Selecione um arquivo JSON!');
      return;
    }
    const arquivo = this.arquivoSelecionado; // O arquivo é o primeiro arquivo selecionado pelo usuário
    const reader = new FileReader(); // FileReader é uma classe que permite que o JavaScript leia arquivos ou blobs de dados (como imagens) armazenados no computador do usuário.
    this.perguntasCadastradas = (await this.quiz.obterPerguntas()).map(
      (p) => p.pergunta
    ); // Obtém as perguntas cadastradas no Firestore
    reader.onload = (e: any) => {
      // O evento onload é acionado quando o arquivo é carregado com sucesso
      const jsonConteudo = e.target.result; // O conteúdo do arquivo é armazenado na variável jsonConteudo
      try {
        // Analisar o JSON
        const perguntas: Pergunta[] = JSON.parse(jsonConteudo); // O conteúdo do arquivo é analisado como um array de perguntas

        // Iterar sobre cada pergunta e adicioná-la ao Firestore
        perguntas.forEach((pergunta, index) => {
          if (this.perguntasCadastradas.includes(pergunta.pergunta)) {
            console.log(`Pergunta ${index + 1} já cadastrada!`);
            return;
          }

          // Adicionar a pergunta ao serviço Quiz
          this.quiz
            .adicionarPergunta(pergunta)
            .then(() => {
              console.log(`Pergunta ${index + 1} adicionada com sucesso!`);
              if (index === perguntas.length - 1) {
                //Quer dizer que chegou a última pergunta
                // Navegar para a página de gerenciamento de perguntas após adicionar todas as perguntas
                this.router.navigateByUrl('/gerenciar-perguntas');
              }
            })
            .catch((error) => {
              console.error(`Erro ao adicionar pergunta ${index + 1}:`, error);
            });
        });
      } catch (error) {
        console.error('Erro ao analisar o arquivo JSON:', error);
      }
    };

    reader.readAsText(arquivo);
  }
}
