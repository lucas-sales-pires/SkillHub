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
    return new Promise((resolve) => { // Uma nova promessa que espera resolver algo
      const auth = getAuth(); // Pega os dados do usuário autenticado
      auth.onAuthStateChanged(async (user) => { // Fica observando cada alteração no status do usuário(login,logout etc)
        if (user) { // Se eu tenho o usuario
          const usuario = await this.dados.PegarUsuarioPorEmail(user.email); // A constante usuario recebe os dados do usuário que vem do PegarUsuarioPorEmail
          this.usuarioAtual = user; // O usuario atual recebe o usuario 
          resolve(usuario); // A promessa resolvida me retorna o usuario com seus dados
        } else {
          this.deslogar(); // Deslogo o usuario 
          this.usuarioAtual = null; // E o meu usuarioAtual recebe um null
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

