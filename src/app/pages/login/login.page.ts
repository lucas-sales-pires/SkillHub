import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {NavbarComponent } from '../../components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,NavbarComponent]
})
export class LoginPage implements OnInit {

  constructor() {

    addIcons({ eye,lockClosed });
   }
   mudarVisibilidade(verificar: IonInput) {
    const formato = verificar.type;
    verificar.type = (formato === 'password') ? 'text' : 'password';
  }

  ngOnInit() {
  }

}
