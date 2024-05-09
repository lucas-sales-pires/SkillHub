import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TimeInterface } from 'src/app/interfaces/interfaceTime';

@Component({
    selector: 'app-time',
    templateUrl: './time.page.html',
    styleUrls: ['./time.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, NavbarComponent]
})
export class TimePage implements OnInit {
times: TimeInterface[]=[];
time = [
  { nome: 'Juventudo',
    descricao: 'Clube de futebol',
    dataFundacao: '17 de novembro de 1895',
    pais: 'Brasil',
    pontuacaoTime: 100,
  },
]
constructor() { }

ngOnInit() {
    this.times = [
      this.time[0],
      ]
    
  }

}
