import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TimeInterface } from 'src/app/interfaces/interfaceTime';
import { TimeService } from 'src/app/services/time/time.service';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';
import { CadastrotimeComponent } from 'src/app/components/cadastrotime/cadastrotime.component';
import { AlertController } from '@ionic/angular';
@Component({
    selector: 'app-time',
    templateUrl: './time.page.html',
    styleUrls: ['./time.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, CadastrotimeComponent]
})
export class TimePage implements OnInit {
times: TimeInterface[]=[];

constructor(private timesService: TimeService,private controler:AlertController) {
  addIcons({
    'add-circle': addCircle
  });
 }

carregarTimes(){
    this.timesService.PegarTimes().then((resultado: any) => {
        this.times = resultado;
        console.log(resultado)
    });
}

adicionarFotoNoTime(time: TimeInterface){
    
}

ngOnInit() {
   this.carregarTimes();
  }

}
