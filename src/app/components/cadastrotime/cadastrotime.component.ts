import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  IonCard,
  IonContent,
  IonLabel,
  IonItem,
  IonModal,
  IonButton,
  IonIcon,
  IonButtons,
  IonInput,
  IonImg,
  IonRadio,
  IonSelect,
  IonSelectOption, IonProgressBar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { TimeService } from 'src/app/services/time/time.service';
import { addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HttpClient } from '@angular/common/http';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrotime',
  templateUrl: './cadastrotime.component.html',
  styleUrls: ['./cadastrotime.component.scss'],
  standalone: true,
  imports: [IonProgressBar, 
    IonRadio,
    IonImg,
    IonInput,
    IonButtons,
    IonIcon,
    IonButton,
    IonItem,
    IonLabel,
    IonContent,
    IonCard,
    FormsModule,
    IonModal,
    IonSelect,
    IonSelectOption,
    CommonModule,
  ],
})
export class CadastrotimeComponent implements OnInit {
progresso: any;
nome: any;
descricao: any;
dataFundacao: any;
pontuacaoTime: any = 0;
@ViewChild(IonModal) //@ViewChild: Essa anotação indica ao Angular que você deseja buscar um elemento específico na sua visualização. No caso, IonModal é o tipo de elemento que você deseja acessar.
modal!: IonModal; //O sinal de exclamação (!) indica ao Angular que a variável modal não pode ser nula. Isso significa que você tem certeza de que o elemento modal estará presente na sua visualização.
bandeiraUrl: any;
arquivo!: File;
idTimeAtual: any;

private readonly storage: Storage = inject(Storage);
  
constructor(private time: TimeService, private http: HttpClient) {
  addIcons({
    'add-circle-outline': addCircleOutline,
    });
  }

fecharModal() {
  this.modal.dismiss();
}
  

adicionarTime() {
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
  console.log(this.nome, this.descricao, this.pontuacaoTime);
  this.time.AdicionarTime({
    nome: this.nome,
    descricao: this.descricao,
    dataFundacao: dataHoraFormatada,
    pontuacaoTime: this.pontuacaoTime,
  });
  this.modal.dismiss();
}

  async logo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.arquivo = input.files[0];
      await this.carregarFoto();
    }
  }

async gerarId() {
  this.idTimeAtual = Math.random().toString(36).substring(2);
}

async carregarFoto(): Promise<void> {
  if (!this.arquivo || !this.idTimeAtual) {
    return;
  }

  const storageRef = ref(
    this.storage,
    `logoTimes/${this.arquivo.name + this.idTimeAtual}`
  );
  const task = uploadBytesResumable(storageRef, this.arquivo);

  task.on('state_changed', async (snapshot) => {
    this.progresso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    if (this.progresso == 100) {
      const downloadURL = await getDownloadURL(storageRef);
      this.time.AdicionarFotoNoTime(this.nome, downloadURL);
    }
  });
}


  ngOnInit() {
  

    this.gerarId();
  }
}
