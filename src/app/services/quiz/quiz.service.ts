import { Injectable, signal } from '@angular/core';
import {Firestore,collection,addDoc,getDocs,deleteDoc,doc,where,query,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Pergunta } from 'src/app/interfaces/interfacePerguntas';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  public categoria = signal('vazio');
  public quantidadePerguntas = signal(0);
  public quantidadePerguntasPorCategoria = signal(0);

  constructor(private db: Firestore) {}
  setCategoria(categoria: string) {
    this.categoria.set(categoria);
  }
  getCategoria() {
    return this.categoria();
  }

  public async adicionarPergunta(pergunta: Pergunta) {
    const colecao = collection(this.db, 'quiz');
    return addDoc(colecao, pergunta);
  }
  async obterPerguntas(){
    const colecao = collection(this.db, 'quiz');
    const perguntas: Pergunta[] = [];

    const querySnapshot = await getDocs(colecao);
    querySnapshot.forEach((doc) => {
      const pergunta: Pergunta = {
        id: doc.id,
        categoria: doc.data()['categoria'],
        pergunta: doc.data()['pergunta'],
        respostas: doc.data()['respostas'],
        respostaCerta: doc.data()['respostaCerta'],
      };
      perguntas.push(pergunta);
    });

    return perguntas;
  }

  
  async  embaralharArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  async  obterPerguntasPorCategoria(
    categoriaDesejada: any,
    quantidadePerguntas: number
  ): Promise<Pergunta[]> {
    const perguntas: Pergunta[] = [];
  
    const querySnapshot = await getDocs(
      query(
        collection(this.db, 'quiz'),
        where('categoria', '==', categoriaDesejada)
      )
    );
  
    querySnapshot.forEach((doc) => {  
      const pergunta: Pergunta = {
        id: doc.id,
        categoria: doc.data()['categoria'],
        pergunta: doc.data()['pergunta'],
        respostas: doc.data()['respostas'],
        respostaCerta: doc.data()['respostaCerta'],
      };
     perguntas.push(pergunta);
    });
    
    const perguntasEmbaralhadas = await this.embaralharArray(perguntas);
  
    return perguntasEmbaralhadas.splice(0, quantidadePerguntas);
  }
  
  async pegarIdDaPergunta(pergunta: string) {
    const perguntas = await this.obterPerguntas();

    const perguntaEncontrada = perguntas.find((p) => p.pergunta === pergunta);

    return perguntaEncontrada?.id;
  }
  public removerPergunta(id: string): Observable<void> {
    const docRef = doc(this.db, 'quiz', id); 
    return from(deleteDoc(docRef));
  }
}
