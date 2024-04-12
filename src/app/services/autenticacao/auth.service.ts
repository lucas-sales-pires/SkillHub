import { Injectable } from '@angular/core';
import { getAuth, User } from 'firebase/auth';
import { Dados } from '../dados/dados.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioAtual: User | null = null;

  constructor(private dados: Dados) { }

  async buscarUsuario() {
    return new Promise((resolve) => {
      const auth = getAuth();
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const usuario = await this.dados.PegarUsuarioPorEmail(user.email);
          this.usuarioAtual = user;
          resolve(usuario);
        } else {
          console.log('Nenhum usuário logado.');
          this.usuarioAtual = null;
        }
      }
    )})
  }
  async deslogar(){
    const auth = getAuth();
    await auth.signOut();
    window.location.href = '/login';
  }
}

