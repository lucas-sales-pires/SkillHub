import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TimeInterface } from 'src/app/interfaces/interfaceTime';
import { TimeService } from 'src/app/services/time/time.service';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';
import { CadastrotimeComponent } from 'src/app/components/cadastrotime/cadastrotime.component';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/autenticacao/auth.service';
import { ModalDetalhesComponent } from 'src/app/components/modal-detalhes/modal-detalhes.component';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { ModalQuantidadeComponent } from 'src/app/components/modal-quantidade/modal-quantidade.component';
@Component({
  selector: 'app-time',
  templateUrl: './time.page.html',
  styleUrls: ['./time.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, ModalQuantidadeComponent,CadastrotimeComponent,ModalDetalhesComponent]
  
})

export class TimePage implements OnInit {
  times: TimeInterface[]=[];
  atualizarTimeNoBackend: any;
  usuarioAtual : string = '';
  
ngOnInit() {
  this.carregarTimes();
  this.usuario.buscarUsuario().then((usuario: any) => {
    this.usuarioAtual = usuario.nome; 
  });

}
  constructor(private timesService: TimeService,private controler:AlertController, private usuario: AuthService, private ModalController: ModalController) {
    addIcons({
      'add-circle': addCircle
    });
  }
  fecharModal() {
    this.ModalController.dismiss();
  }
  public async abrirModalDetalhes(time: TimeInterface){
    const modal = await this.ModalController.create({
      component: ModalDetalhesComponent, 
      componentProps: {
        time: time 
      }
    });
    await modal.present();
  }
  sairDoTime(_t17: TimeInterface) {
    throw new Error('Metodo não implementado.');
  }


async entrarNoTime(time: any) {
  
  const confirm = await this.controler.create({
    header: 'Confirmar Entrada',
    message: `Deseja entrar no time ${time.nome}?`,
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      { text: 'Entrar', handler: () => this.confirmarEntrada(time) }
    ]
  });
  await confirm.present();
}


confirmarEntrada(time: any) {
  if(time.membros.includes(this.usuarioAtual)){
    this.mostrarAlerta("Você já está no time!");
    return;
  }

  this.timesService.AtualizarTimeNoBackEnd(time,this.usuarioAtual); 

  this.mostrarAlerta("Você entrou no time com sucesso!");
}

async mostrarAlerta(mensagem: string) {
  const alert = await this.controler.create({
    header: 'Aviso',
    message: mensagem,
    buttons: ['OK']
  });
  await alert.present();
}



carregarTimes(){
    this.timesService.PegarTimes().then((resultado: any) => {
        this.times = resultado;
    });
}

adicionarFotoNoTime(time: TimeInterface){
    
}

 usuarioEstaEmAlgumTime(): boolean {
  return this.times.some(time => time.membros && time.membros.includes(this.usuarioAtual));
}


}
