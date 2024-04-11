import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCardContent, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-escolha',
  templateUrl: './escolha.page.html',
  styleUrls: ['./escolha.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader, IonCardContent,  CommonModule, FormsModule]
})
export class EscolhaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
