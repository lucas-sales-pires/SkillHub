import { Component, effect } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from './services/autenticacao/auth.service';
import { getAuth } from 'firebase/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);

  constructor(private autenticacao: AuthService) {
    effect(() => {
      const auth = getAuth(); 
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          this.autenticacao.setAutenticado(true);
          
        } else {
          this.autenticacao.setAutenticado(false);
        }
      });
    });
  }

}
