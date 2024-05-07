import { Injectable } from '@angular/core';
import {Firestore,collection,doc,addDoc,setDoc,deleteDoc,DocumentData,docData,DocumentReference,query,where, getDocs} from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class Dados {
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

    public async CriarUsuario(dadosUsuario: { nome: string; email: string; senha: string; diaCadastro:string }) { // Método para criar um usuário
        const usuarioExistente = await this.PegarUsuarioPorEmail(dadosUsuario.email);  // Verifica se o email já está cadastrado
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

    public DeletarUsuario(id: string): Observable<void> { // Método para deletar um usuário
        const docRef = doc(this.db, 'usuarios', id); // Referência para o documento do usuário
        return from(deleteDoc(docRef)); // Deleta o documento e retorna um Observable
    }
}

