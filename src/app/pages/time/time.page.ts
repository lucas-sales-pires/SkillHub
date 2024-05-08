import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
    selector: 'app-time',
    templateUrl: './time.page.html',
    styleUrls: ['./time.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, NavbarComponent]
})
export class TimePage implements OnInit {
time: any;
times: any;

  constructor() { }

  ngOnInit() {
  }

}
