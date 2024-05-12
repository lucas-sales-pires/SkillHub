import { Injectable, signal } from '@angular/core';
import {Firestore,collection,doc,addDoc,setDoc,deleteDoc,query,where, getDocs} from '@angular/fire/firestore';
import { Ranking } from 'src/app/interfaces/interfaceRanking';

import { Observable, from } from 'rxjs';
import { TimeInterface } from 'src/app/interfaces/interfaceTime';

@Injectable({
    providedIn: 'root',
})
export class Dados {
    public adm = signal(false);
    public resultado = signal(false);

    constructor(private db: Firestore) {}

    public async PegarIdPorEmail(email: string) { // Método para pegar um usuário por email
        const dados = query(collection(this.db, "usuarios"), where("email", "==", email)); // Query para buscar um usuário com o email fornecido
        const consulta = await getDocs(dados); // Executa a query
        return !consulta.empty ? consulta.docs[0].id : undefined; // Retorna o documento se ele existir com id, senão retorna undefined
    }
    
    public async PegarUsuarioPorEmail(email: any){
        const dados = query(collection(this.db, "usuarios"), where("email", "==", email)); // Query para buscar um usuário com o email fornecido
        const consulta = await getDocs(dados); // Executa a query
        
        if (!consulta.empty) { // Se o resultado da consulta não estiver vazio
            return consulta.docs[0].data(); // Retorna todos os dados do documento do usuário
        } else {
            return undefined; // Retorna undefined se nenhum usuário for encontrado com o email fornecido
        }
    }

    public async EnviarFeedBack(feedback: { nome: string; email: string; feedback: string; diaFeedback:string }) { // Método para criar um feedback
        const collectionRef = collection(this.db, 'feedbacks'); // Referência para a coleção 'feedbacks'
        return addDoc(collectionRef, feedback); // Adiciona um novo documento com os dados do feedback e retorna uma Promise
    }
    
    public async EnviarParaRanking(ranking: Ranking) { // Método para criar um ranking
        const collectionRef = collection(this.db, 'ranking'); // Referência para a coleção 'ranking'
        return addDoc(collectionRef, ranking); // Adiciona um novo documento com os dados do ranking e retorna uma Promise
    }

    public async PegarRanking() { // Método para pegar o ranking
        const dados = query(collection(this.db, "ranking")); // Query para buscar todos os documentos da coleção 'ranking'
        const consulta = await getDocs(dados); // Executa a query
        return !consulta.empty ? consulta.docs.map(doc => doc.data()) : ''; // Retorna todos os documentos se eles existirem, senão retorna undefined
    }

    public async CriarUsuario(dadosUsuario: { nome: any; email: string; senha: string; diaCadastro:string; bloqueado: boolean }) { // Método para criar um usuário
        const usuarioExistente = await this.PegarUsuarioPorEmail(dadosUsuario.email);  // Verifica se o email já está cadastrado
        const mesmonome = await this.PegarTodosUsuarios().then((resultado: any) => {
            return resultado.some((usuario: any) => usuario.nome === dadosUsuario.nome);
        }   
        );

      if(mesmonome){
            this.resultado.set(true);
            throw new Error('O nome já está cadastrado.');
            
        }
        if (usuarioExistente) { // Se o email já estiver cadastrado
            throw new Error('O email já está cadastrado.'); // Lança um erro se o email já estiver cadastrado
        } else {
            const collectionRef = collection(this.db, 'usuarios'); // Referência para a coleção 'usuarios'
            return addDoc(collectionRef, dadosUsuario); // Adiciona um novo documento com os dados do usuário e retorna uma Promise
        }
    }

    public AtualizarUsuario(id: string, dadosUsuario: { nome?: string; email?: string; }): Observable<void> { // Método para atualizar um usuário
        const docRef = doc(this.db, 'usuarios', id); // Referência para o documento do usuário
        return from(setDoc(docRef, dadosUsuario, { merge: true })); // Atualiza o documento com os novos dados e retorna um Observable
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
    
    
    public async AdicionarTime(time: TimeInterface) {
        const collectionRef = collection(this.db, 'times');
        return addDoc(collectionRef, time);
    }
    
    public async PegarTime() {
        const dados = query(collection(this.db, "times"));
        const consulta = await getDocs(dados);
        return !consulta.empty ? consulta.docs.map(doc => doc.data()) : '';
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
            return isAdmin === true; // Se o administrador for true, retorna true
        } else {
            return false; // Se não houver documentos na consulta, retorna false
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

