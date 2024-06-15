import { Component, effect, EventEmitter, OnInit, Output } from '@angular/core';
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
import { EfeitosVisuaisService } from 'src/app/services/efeitos/efeitos-visuais.service';
@Component({
  selector: 'app-time',
  templateUrl: './time.page.html',
  styleUrls: ['./time.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, ModalQuantidadeComponent,CadastrotimeComponent,ModalDetalhesComponent]
  
})

export class TimePage implements OnInit {
  @Output() timeAtualizado = new EventEmitter<void>()
  times: TimeInterface[]=[];
  atualizarTimeNoBackend: any;
  usuarioAtual : string = '';
  
ngOnInit() {
  this.carregarTimes();
  this.usuario.buscarUsuario().then((usuario: any) => {
    this.usuarioAtual = usuario.nome; 
  });

}
  constructor(private timesService: TimeService,private controler:AlertController, private usuario: AuthService, private ModalController: ModalController,private efeitos: EfeitosVisuaisService) {
    addIcons({
      'add-circle': addCircle
    });
    effect(() => {
      if (this.timesService.estadoTime() === 'atualizado') {
        this.carregarTimes();
      }
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
async sairDoTime(time: TimeInterface) {
    const confirmar = await this.controler.create({
      header: 'Confirmar Saida',
      message: `Deseja sair do time ${time.nome}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Sair', handler: () => this.confirmarSaida(time) }
      ]
  });
  await confirmar.present();
}

confirmarSaida(time:TimeInterface){
  this.timesService.RemoverUsuarioDoTime(time,this.usuarioAtual).then(() => { 
    this.carregarTimes(); 
    this.efeitos.mostrarAlerta("Você saiu do time com sucesso!");
    this.timeAtualizado.emit(); 
  })
  .catch((error) => { 
    console.error("Erro ao sair do time:", error);
  });

}

async entrarNoTime(time: TimeInterface) {
  
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


confirmarEntrada(time: TimeInterface) {
  if(time.membros){
  if(time.membros.includes(this.usuarioAtual)){
    this.efeitos.mostrarAlerta("Você já está no time!");
    return;
  }
  }


  this.timesService.AtualizarTimeNoBackEnd(time,this.usuarioAtual); 
  

  this.efeitos.mostrarAlerta("Você entrou no time com sucesso!");
}


carregarTimes(){
    this.timesService.PegarTimes().then((resultado: any) => {
        this.times = resultado;
        this.timesService.estadoTime.set('estadoInicial'); 

    });
}


usuarioEstaEmAlgumTime() {
  return this.times.some(time => time.membros && time.membros.includes(this.usuarioAtual));
}



}
