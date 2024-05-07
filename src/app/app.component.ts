import { Component, effect } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from './services/autenticacao/auth.service';
import { getAuth } from 'firebase/auth';
import { QuizService } from './services/quiz/quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);

  constructor(private autenticacao: AuthService, private quiz: QuizService) {
    effect(() => {
      const auth = getAuth(); // Pega os dados do usuário autenticado
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          this.autenticacao.setAutenticado(true);
        } else {
          this.autenticacao.setAutenticado(false);
        }
      });
    });
  }

  ngOnInit(): void {}
}
