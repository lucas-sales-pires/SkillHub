import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-certeza',
  templateUrl: './modal-certeza.component.html',
  styleUrls: ['./modal-certeza.component.scss'],
  standalone: true
})
export class ModalCertezaComponent  implements OnInit {
  alertController: any;

  constructor() { }

  ngOnInit() {}

  async exibirConfirmacao(funcao: any) {
    const confirmacao = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que quer fazer isso?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.alertController.dismiss();
          }
        }, {
          text: 'Confirmar',
   
          handler: () => {
            funcao
          }
        }
      ]
    });
  
    await confirmacao.present();
  }
  
}



