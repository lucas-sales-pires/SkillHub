import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {NavbarComponent } from '../../components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { eye, lockClosed,lockClosedOutline, eyeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,NavbarComponent]
})
export class LoginPage implements OnInit {

  constructor() {

    addIcons({ eye,lockClosed,lockClosedOutline, eyeOutline });
   }
   mudarVisibilidade(verificar: any) {
    const formato = verificar.type;
    verificar.type = (formato === 'password') ? 'text' : 'password';
  }

  ngOnInit() {
  }

}
