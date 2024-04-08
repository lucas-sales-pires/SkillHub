import { Injectable } from '@angular/core';
import { getAuth, User } from 'firebase/auth';
import { Dados } from '../dados/dados.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null;

  constructor(private dados: Dados) { }

  async buscarUsuario() {
    return new Promise((resolve) => {
      const auth = getAuth();
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          console.log('Usuário logado:', user.email);
          const usuario = await this.dados.PegarUsuarioPorEmail(user.email);
          this.currentUser = user;
          resolve(usuario);
        } else {
          console.log('Nenhum usuário logado.');
          this.currentUser = null;
        }
      }
    )})
  }
}

