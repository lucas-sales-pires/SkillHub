import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterfaceMensagem } from 'src/app/interfaces/interfaceMensagem';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'https://projeto-api-rest.onrender.com';

  constructor(private http: HttpClient) { }


  usuarioBuscarMensagensAdm(nome: string): Observable<InterfaceMensagem[]> {
    return this.http.get<InterfaceMensagem[]>(`${this.apiUrl}/administrativa/${nome}`);
  }

getMensagensAdministrativas(){
  return this.http.get<any[]>(`${this.apiUrl}/buscar-adm`);
}

enviarMensagemAdministrativa(usuario: string, conteudo: string) {
  console.log('Enviando mensagem administrativa...')
  return this.http.post<any>(`${this.apiUrl}/administrativa`, { usuario, conteudo });
}

excluirMensagemAdministrativa(id: string) {
  return this.http.delete(`${this.apiUrl}/deletar-usuario/`,{
    body: {
      id
    }
  });
}

excluirMensagemRecebidaDoUsuario(id: string) {
  return this.http.delete(`${this.apiUrl}/deletar-adm/`,{
    body: {
      id
    }
  });
}




}
