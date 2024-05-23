import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-modal-certeza',
  templateUrl: './modal-certeza.component.html',
  styleUrls: ['./modal-certeza.component.scss'],
  standalone: true
})
export class ModalCertezaComponent {

  constructor(private controler:AlertController) { }

  async exibirConfirmacao(funcao: any) {
    const confirmacao = await this.controler.create({
      header: 'Confirmação',
      message: 'Tem certeza que quer fazer isso?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.controler.dismiss();
          }
        }, {
          text: 'Confirmar',
   
          handler: () => {
            funcao.call();
          }
        }
      ]
    });
  
    await confirmacao.present();
  }
  
}



