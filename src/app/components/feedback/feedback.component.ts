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
  IonSelect,
  IonText,
  IonTextarea,
} from '@ionic/angular/standalone';
import { Dados } from 'src/app/services/dados/dados.service';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonText,
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
export class FeedbackComponent implements OnInit {
  nome: any;
  email: any;
  feedback: any;

  @ViewChild(IonModal) //@ViewChild: Essa anotação indica ao Angular que você deseja buscar um elemento específico na sua visualização. No caso, IonModal é o tipo de elemento que você deseja acessar.
  modal!: IonModal; //O sinal de exclamação (!) indica ao Angular que a variável modal não pode ser nula. Isso significa que você tem certeza de que o elemento modal estará presente na sua visualização.

  constructor(private dados: Dados, private service: AuthService) {
    effect(() => {
      this.feedback.length > 0
        ? console.log('Feedback: ', this.feedback)
        : console.log('Feedback vazio');
    });
  }

  ngOnInit() {
    this.service.buscarUsuario().then((resultado: any) => {
      // buscarUsuário retorna os dados do usuário atual
      this.email = resultado['email']; // Atribui ao this.email o email dele
      this.nome = resultado['nome'];
      this.carregarUsuario(this.email); //A função carregarUsuario precisa do email do usuário para ser executada
    });
  }

  cancelarFeedback() {
    this.modal.dismiss(); // Fecha o modal
  }

  enviarFeedback() {
    // Obtém a data e hora atual
    let dataAtual = new Date();
    // Obtém os componentes individuais da data e hora
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1;
    let ano = dataAtual.getFullYear();
    let horas = dataAtual.getHours();
    let minutos = dataAtual.getMinutes();

    // Formata a data e hora para o formato desejado
    let dataHoraFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`;

    this.dados
      .EnviarFeedBack({
        // Envia um feedback com os dados do usuário
        nome: this.nome, // Nome do usuário
        email: this.email, // Email do usuário
        feedback: this.feedback, // Feedback do usuário
        diaFeedback: dataHoraFormatada, // Data e hora do feedback
      })
      .then(() => {
        // Se o feedback for enviado com sucesso
        this.feedback = ''; // Limpa o campo de feedback
        this.modal.dismiss(); // Fecha o modal
      });
  }

  async carregarUsuario(email: string) {
    const usuario = await this.dados.PegarUsuarioPorEmail(email); // Usuário recebe uma requisição assincrona pra pegar os dados do usuário baseado no email
    if (usuario) {
      // Se existir este usuário
      this.nome = usuario['nome']; // Preenche o nome dele
    } else {
      this.service.deslogar(); // Utiliza a função de deslogar
    }
  }
}
