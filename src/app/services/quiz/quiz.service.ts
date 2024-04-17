import { Injectable, signal } from '@angular/core';
import { Firestore,collection,addDoc, getDocs, deleteDoc, doc, where, query } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Pergunta } from 'src/app/components/perguntas/interfacePerguntas';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public categoria = signal("vazio")
  public quantidadePerguntas = signal(0)

  constructor(private db:Firestore) {
    
  }
  setCategoria(categoria: string) {
    this.categoria.set(categoria)
  }
  getCategoria(){
    return this.categoria()
  }

  public async adicionarPergunta(pergunta:Pergunta) {
    const colecao  = collection(this.db,"quiz") 
    return addDoc(colecao,pergunta)
    
  }
  async obterPerguntas(): Promise<Pergunta[]> {
    const colecao = collection(this.db, "quiz");
    const perguntas: Pergunta[] = [];
  
    const querySnapshot = await getDocs(colecao);
     querySnapshot.forEach((doc) => { // Para cada pergunta pego todos os dados 
      const pergunta: Pergunta = {
        id: doc.id,
        categoria:doc.data()['categoria'],
        pergunta: doc.data()['pergunta'],
        respostas: doc.data()['respostas'] ,
        respostaCerta: doc.data()['respostaCerta']
      };
      perguntas.push(pergunta);
      
    });
  
    return perguntas;
  }
  async obterPerguntasPorCategoria(categoriaDesejada:any): Promise<Pergunta[]> {
    const perguntas: Pergunta[] = [];
  
    const querySnapshot = await getDocs(query(collection(this.db, "quiz"), where("categoria", "==", categoriaDesejada)));
  
    querySnapshot.forEach((doc) => { // Para cada pergunta pego todos os dados 
      const pergunta: Pergunta = {
        id: doc.id,
        categoria: doc.data()['categoria'],
        pergunta: doc.data()['pergunta'],
        respostas: doc.data()['respostas'],
        respostaCerta: doc.data()['respostaCerta']
      };
      perguntas.push(pergunta);
    });
  
    return perguntas;
  }
  
  async pegarIdDaPergunta(pergunta: string) {
    // Obtém a lista de perguntas
    const perguntas = await this.obterPerguntas();

    // Encontra a pergunta pelo texto
    const perguntaEncontrada = perguntas.find(p => p.pergunta === pergunta);

    return perguntaEncontrada?.id;
}
public removerPergunta(id: string): Observable<void> { // Método para deletar um usuário
  const docRef = doc(this.db, 'quiz', id); // Referência para o documento do quiz
  return from(deleteDoc(docRef)); // Deleta o documento e retorna um Observable
}

}
