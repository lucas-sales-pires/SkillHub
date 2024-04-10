import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc, onSnapshot, getDocs } from '@angular/fire/firestore';
import { Pergunta } from 'src/app/components/perguntas/interfacePerguntas';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private db:Firestore) {
    
  }
  public async adicionarPergunta(pergunta:Pergunta) {
    const colecao  = collection(this.db,"quiz")
    return addDoc(colecao,pergunta)
    
  }
  async obterPerguntas(): Promise<Pergunta[]> {
    const colecao = collection(this.db, "quiz");
    const perguntas: Pergunta[] = [];
  
    const querySnapshot = await getDocs(colecao);
     querySnapshot.forEach((doc) => {
      const pergunta: Pergunta = {
        id: doc.id as unknown as number,
        pergunta: doc.data()['pergunta'],
        respostas: doc.data()['respostas'] ,
      };
      perguntas.push(pergunta);
    });
  
    return perguntas;
  }
  
  
  

}
