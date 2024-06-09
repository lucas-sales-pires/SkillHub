import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'https://projeto-api-rest.onrender.com';

  constructor(private http: HttpClient) { }

getMensagensAnteriores(sala: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/anteriores/${sala}`);
}

getMensagensUsuario(nome: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/mensagens/${nome}`);
}

getMensagensAdministrativas(usuario: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/administrativa`, {
    params: { usuario }
  });
}

enviarMensagemAdministrativa(usuario: string, conteudo: string): Observable<any> {
  console.log('Enviando mensagem administrativa...')
  return this.http.post<any>(`${this.apiUrl}/administrativa`, { usuario, conteudo });
}


}
