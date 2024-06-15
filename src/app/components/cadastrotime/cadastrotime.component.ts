import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {IonCard,IonContent,IonLabel,IonItem,IonModal,IonButton,IonIcon,IonButtons,IonInput,IonImg,IonRadio,IonSelect,IonSelectOption, IonProgressBar, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { TimeService } from 'src/app/services/time/time.service';
import { addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { EfeitosVisuaisService } from '../../services/efeitos/efeitos-visuais.service';

@Component({
  selector: 'app-cadastrotime',
  templateUrl: './cadastrotime.component.html',
  styleUrls: ['./cadastrotime.component.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonProgressBar, IonRadio,IonImg,IonInput,IonButtons,IonIcon,IonButton,IonItem,IonLabel,IonContent,IonCard,FormsModule,IonModal,IonSelect,IonSelectOption,CommonModule,
  ],
})
export class CadastrotimeComponent implements OnInit {
progresso: any;
nome: any;
descricao: any;
dataFundacao: any;
pontuacaoTime: any = 0;
bandeiraUrl: any;
arquivo!: File;
idTimeAtual: any;
@ViewChild(IonModal) 
modal!: IonModal;
private readonly storage: Storage = inject(Storage);
nomeArquivoLogo: any;
logoSelecionado: string | null = null;
logosDisponiveis = [
  { nome: 'Logo 1', url: '/assets/logos/logo-1.png' },
  { nome: 'Logo 2', url: '/assets/logos/logo-2.png' },
  { nome: 'Logo 3', url: '/assets/logos/logo-3.png' },
  { nome: 'Logo 4', url: '/assets/logos/logo-4.png' },
  { nome: 'Logo 5', url: '/assets/logos/logo-5.png' },
  { nome: 'Logo 6', url: '/assets/logos/logo-6.png' },
  { nome: 'Logo 7', url: '/assets/logos/logo-7.png' },
  { nome: 'Logo 8', url: '/assets/logos/logo-8.png' },

];


ngOnInit() {
  this.gerarId();
}

constructor(private time: TimeService, private efeitos : EfeitosVisuaisService) {
  
  addIcons({
    'add-circle-outline': addCircleOutline,
  });
}

fecharModal() {
  this.modal.dismiss();
}
  

adicionarTime() {
  let dataAtual = new Date();
  let dia = dataAtual.getDate();
  let mes = dataAtual.getMonth() + 1;
  let ano = dataAtual.getFullYear();
  let horas = dataAtual.getHours();
  let minutos = dataAtual.getMinutes();
  let dataHoraFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`;

  if(this.nome == null || this.descricao == null || this.logoSelecionado == null) {
    this.efeitos.mostrarToast(false, 'Preencha todos os campos!');
    return;
  }

  this.time.AdicionarTime({
    nome: this.nome,
    descricao: this.descricao,
    dataFundacao: dataHoraFormatada,
    pontuacaoTime: this.pontuacaoTime,
    logo: this.logoSelecionado,
  });
  this.efeitos.mostrarToast(true, 'Time cadastrado com sucesso!');
  this.time.estadoTime.set("atualizado");
  this.modal.dismiss();
}

  async logo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.arquivo = input.files[0];
      await this.carregarFoto();
    }
  }

  selecionarLogo(logoUrl: string) {
    this.logoSelecionado = logoUrl;
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



}
