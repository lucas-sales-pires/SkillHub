import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDocs, increment, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { TimeInterface } from 'src/app/interfaces/interfaceTime';
import { signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private paises: any[] = [];
  public estadoTime = signal('estadoInicial');

  constructor(private db : Firestore) { 
  
  }

  getPaises(): any[]{
    return this.paises;
  }
    
  public async AdicionarTime(time: TimeInterface) {
    try {
        const collectionRef = collection(this.db, 'times');
        await addDoc(collectionRef, time);
        return 'Time adicionado com sucesso';
    } catch (error) {
        console.error('Erro ao adicionar time:', error);
        return 'Erro ao adicionar time';
    }
}


public async PegarTimes() {
    const dados = query(collection(this.db, "times"));
    const consulta = await getDocs(dados);
    return !consulta.empty ? consulta.docs.map(doc => doc.data()) : '';
} 

public async PegarIdTime(nomeTime : string){
  const dados = query(collection(this.db, "times"));
  const consulta = await getDocs(dados);
  return !consulta.empty ? consulta.docs.find(doc => doc.data()['nome'] === nomeTime)?.id : '';
}

public async AdicionarFotoNoTime(nome: string, foto: string) {
  const dados = query(collection(this.db, "times"), where("nome", "==", nome));
  const consulta = await getDocs(dados);
  if (!consulta.empty) {
      const docRef = doc(this.db, 'times', consulta.docs[0].id);
      await setDoc(docRef, { foto: foto }, { merge: true });
  }
}
 
  public async AtualizarTimeNoBackEnd(time: any, novoUsuario: any) {
    const id = await this.PegarIdTime(time.nome);

    if (id) {
      const docRef = doc(this.db, 'times', id);
      const timeAtualizado = { ...time }; 

      if (!timeAtualizado.membros) {
        timeAtualizado.membros = [];
      }
      if(timeAtualizado.membros.includes(novoUsuario)){
        console.error('Usuário já está no time.');
        return;
      }

      timeAtualizado.membros.push(novoUsuario);

      await setDoc(docRef, timeAtualizado, { merge: true }); 
    } else {
      console.error('Time não encontrado para atualização.');
    }
  }

  public async RemoverUsuarioDoTime(time:TimeInterface, usuario: string){
    const id = await this.PegarIdTime(time.nome);

    if(id) {
      const docRef = doc(this.db, 'times', id);
      const timeAtualizado = {...time};
    

    if(timeAtualizado.membros.includes(usuario)){
      timeAtualizado.membros = timeAtualizado.membros.filter((membro:string)=> membro != usuario)
      await setDoc(docRef, timeAtualizado, { merge: true});
    
    }
    else{
      console.error("Jogador não encontrado no time. ")
    }

    }
}

  public async AdicionarPontuacaoAoTime(nomeTime: string, pontuacao: number) {
    const id = await this.PegarIdTime(nomeTime);
  
    if (id) {
      const docRef = doc(this.db, 'times', id);
      await updateDoc(docRef, { pontuacaoTime: increment(pontuacao) });
    } else {
      console.error('Time não encontrado para atualização.');
    }
  }
  
}
