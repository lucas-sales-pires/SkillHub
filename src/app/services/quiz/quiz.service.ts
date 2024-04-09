import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Pergunta } from 'src/app/components/perguntas/interfacePerguntas';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private db:Firestore) {
    
  }
  public async adicionarPergunta(pergunta:Pergunta): Promise<DocumentReference<DocumentData>> {
    const colecao  = collection(this.db,"quiz")
    return addDoc(colecao,pergunta)
    
  }
}
