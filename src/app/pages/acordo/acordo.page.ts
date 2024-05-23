import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
    selector: 'app-acordo',
    templateUrl: './acordo.page.html',
    styleUrls: ['./acordo.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, NavbarComponent]
})
export class AcordoPage {

  constructor() { }



}
