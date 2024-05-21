import { Injectable, signal } from '@angular/core';
import {Firestore,collection,doc,addDoc,setDoc,deleteDoc,query,where, getDocs} from '@angular/fire/firestore';
import { Ranking } from 'src/app/interfaces/interfaceRanking';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class Dados {
    public adm = signal(false);
    public resultado = signal(false);

    constructor(private db: Firestore) {}

    public async PegarIdPorEmail(email: string) { 
        const dados = query(collection(this.db, "usuarios"), where("email", "==", email)); 
        const consulta = await getDocs(dados); 
        return !consulta.empty ? consulta.docs[0].id : undefined; 
    }
    
    public async PegarUsuarioPorEmail(email: any){
        const dados = query(collection(this.db, "usuarios"), where("email", "==", email)); 
        const consulta = await getDocs(dados);
        
        if (!consulta.empty) { 
            return consulta.docs[0].data(); 
        } else {
            return undefined;
        }
    }

    public async EnviarFeedBack(feedback: { nome: string; email: string; feedback: string; diaFeedback:string }) { 
        const collectionRef = collection(this.db, 'feedbacks'); 
        return addDoc(collectionRef, feedback); 
    }
    
    public async EnviarParaRanking(ranking: Ranking) { 
        const collectionRef = collection(this.db, 'ranking'); 
        return addDoc(collectionRef, ranking);
    }

    public async PegarRanking() { 
        const dados = query(collection(this.db, "ranking"));
        const consulta = await getDocs(dados); 
        return !consulta.empty ? consulta.docs.map(doc => doc.data()) : ''; 
    }

    public async CriarUsuario(dadosUsuario: { nome: any; email: string; senha: string; diaCadastro:string; bloqueado: boolean }) { 
        const usuarioExistente = await this.PegarUsuarioPorEmail(dadosUsuario.email);
        const mesmonome = await this.PegarTodosUsuarios().then((resultado: any) => {
            return resultado.some((usuario: any) => usuario.nome === dadosUsuario.nome);
        }   
        );

      if(mesmonome){
            this.resultado.set(true);
            throw new Error('O nome já está cadastrado.');
            
        }
        if (usuarioExistente) {
            throw new Error('O email já está cadastrado.'); 
        } else {
            const collectionRef = collection(this.db, 'usuarios');
            return addDoc(collectionRef, dadosUsuario); 
        }
    }

    public AtualizarUsuario(id: string, dadosUsuario: { nome?: string; email?: string; }): Observable<void> {
        const docRef = doc(this.db, 'usuarios', id);
        return from(setDoc(docRef, dadosUsuario, { merge: true }));
    }

    public async DeletarUsuario(id: string): Promise<void> {
        const docRef = doc(this.db, 'usuarios', id);
        await deleteDoc(docRef);
    }

    public async BloquearUsuario(id: string) {
        try {
            const docRef = doc(this.db, 'usuarios', id);
            await setDoc(docRef, { bloqueado: true }, { merge: true });
            console.log("Usuário bloqueado com sucesso!");
        } catch (error) {
            console.error("Erro ao bloquear usuário:", error);
        }
    }
    
    public async DesbloquearUsuario(id: string) {
        try {
            const docRef = doc(this.db, 'usuarios', id);
            await setDoc(docRef, { bloqueado: false }, { merge: true });
            console.log("Usuário desbloqueado com sucesso!");
        } catch (error) {
            console.error("Erro ao desbloquear usuário:", error);
        }
    }


    public async PegarTodosUsuarios() {
        const dados = query(collection(this.db, "usuarios"));
        const consulta = await getDocs(dados);
        return !consulta.empty ? consulta.docs.map(doc => doc.data()) : '';
    }

    public async VerificarSeEstaBloqueado(email: string) {
        const dados = query(collection(this.db, "usuarios"), where("email", "==", email));
        const consulta = await getDocs(dados);
        return !consulta.empty ? consulta.docs[0].data()['bloqueado'] : '';
    }

    public async Administrador(email: string): Promise<boolean> {
        const dados = query(collection(this.db, "usuarios"), where("email", "==", email));
        const consulta = await getDocs(dados);
    
        if (!consulta.empty) {
            const isAdmin = consulta.docs[0].data()['administrador'];
            return isAdmin === true; 
        } else {
            return false;
        }
    }

    public async AdicionarFotoNoUsuario(email: string, foto: string) {
        const dados = query(collection(this.db, "usuarios"), where("email", "==", email));
        const consulta = await getDocs(dados);
        if (!consulta.empty) {
            const docRef = doc(this.db, 'usuarios', consulta.docs[0].id);
            await setDoc(docRef, { foto: foto }, { merge: true });
        }
    }
    

    
}

