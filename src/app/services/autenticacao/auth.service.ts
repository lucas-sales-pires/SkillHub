import { Injectable } from '@angular/core';
import { getAuth, User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  buscarUsuario(): Observable<User | null> { // Método que retorna um observável que emite um novo valor toda vez que o estado de autenticação do usuário muda.
    return new Observable((observer) => {
      const auth = getAuth();
      const unsubscribe = auth.onAuthStateChanged((usuario) => { // onAuthStateChanged é um método que retorna um observável que emite um novo valor toda vez que o estado de autenticação do usuário muda.
        if (usuario) {
          observer.next(usuario); 
        } else {
          observer.next(null); 
        }
      });
  
      return () => unsubscribe(); // Retorna uma função que cancela a inscrição no observável.
    });
  }
  deslogar(){
    const auth = getAuth();
    auth.signOut();
  }
  
}

