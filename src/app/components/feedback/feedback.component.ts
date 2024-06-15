import { Component, effect, OnInit, ViewChild } from '@angular/core';
import {IonHeader,IonToolbar,IonContent,IonItem,IonButton,IonModal,IonButtons,IonTitle,IonInput,IonLabel,IonIcon,IonList,IonRadio,IonRadioGroup,IonSelectOption,IonCheckbox,IonSelect,IonText,IonTextarea,
} from '@ionic/angular/standalone';
import { Dados } from 'src/app/services/dados/dados.service';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  standalone: true,
  imports: [IonTextarea,IonText,IonCheckbox,IonRadioGroup,IonRadio,IonList,IonIcon,IonLabel,IonInput,IonTitle,IonButtons,IonModal,IonHeader,IonToolbar,IonContent,IonItem,IonButton,FormsModule,IonSelectOption,IonSelect
  ],
})
export class FeedbackComponent implements OnInit {
  nome: any;
  email: any;
  feedback: any = '';
  @ViewChild(IonModal)
  modal!: IonModal;

  ngOnInit() {
    this.service.buscarUsuario().then((resultado: any) => {
      this.email = resultado['email']; 
      this.nome = resultado['nome'];
      this.carregarUsuario(this.email); 
    });
  }
  
  constructor(private dados: Dados, private service: AuthService, private toast: ToastController) {
    effect(() => {
      this.feedback.length > 0
        ? console.log('Feedback: ', this.feedback)
        : console.log('Feedback vazio');
    });
  }


  cancelarFeedback() {
    this.modal.dismiss(); 
  }

  enviarFeedback() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1;
    let ano = dataAtual.getFullYear();
    let horas = dataAtual.getHours();
    let minutos = dataAtual.getMinutes();

    let dataHoraFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    if (this.feedback.length === 0) {
      this.mostrarToast(false);
      return;
    }
    this.dados
      .EnviarFeedBack({
        nome: this.nome, 
        email: this.email, 
        feedback: this.feedback,
        diaFeedback: dataHoraFormatada,
      })
      .then(() => {
        this.feedback = '';
        this.modal.dismiss();
      });
    this.mostrarToast(true);
  }

  async carregarUsuario(email: string) {
    const usuario = await this.dados.PegarUsuarioPorEmail(email);
    if (usuario) {
      this.nome = usuario['nome']; 
    } else {
      this.service.deslogar();
    }
  }

  async mostrarToast(sucesso: boolean) {
    const toast = await this.toast.create({
      message: sucesso ? 'Mensagem enviada com sucesso!' : 'Erro ao enviar mensagem.',
      duration: 2000,
      color: sucesso ? 'success' : 'danger', 
     position: "top",
    });
    await toast.present();
  }
  
}
