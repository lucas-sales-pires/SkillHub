import { Injectable } from '@angular/core';
import {Firestore,collection,doc,addDoc,setDoc,deleteDoc,DocumentData,docData,DocumentReference,collectionData,query,where, getDocs} from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class Dados {
    constructor(private db: Firestore) {}
    

    public PegarTodosUsuarios(): Observable<any[]> { // Método para pegar todos os usuários
        const collectionRef = collection(this.db, 'usuarios'); // Referência para a coleção 'usuarios'
        return collectionData(collectionRef, { idField: 'id' }); // Retorna um Observable com os dados da coleção
    }

    public PegarUsuarioPorId(userId: string): Observable<any> { // Método para pegar um usuário específico
        const docRef = doc(this.db, 'usuarios', userId); // Referência para o documento do usuário
        return docData(docRef, { idField: 'id' }); // Retorna um Observable com os dados do documento
    }
    public async PegarIdPorEmail(email: string) { // Método para pegar um usuário por email
        const dados = query(collection(this.db, "usuarios"), where("email", "==", email)); // Query para buscar um usuário com o email fornecido
        const consulta = await getDocs(dados); // Executa a query
        return !consulta.empty ? consulta.docs[0].id : undefined; // Retorna o documento se ele existir, senão retorna undefined
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
    
    
    public async CriarUsuario(dadosUsuario: { nome: string; email: string; senha: string; diaCadastro:string }): Promise<DocumentReference<DocumentData>> { // Método para criar um usuário
        const usuarioExistente = await this.PegarUsuarioPorEmail(dadosUsuario.email);  // Verifica se o email já está cadastrado
        if (usuarioExistente) { // Se o email já estiver cadastrado
            throw new Error('O email já está cadastrado.'); // Lança um erro se o email já estiver cadastrado
        } else {
            const collectionRef = collection(this.db, 'usuarios'); // Referência para a coleção 'usuarios'
            return addDoc(collectionRef, dadosUsuario); // Adiciona um novo documento com os dados do usuário e retorna uma Promise
        }
    }

    public AtualizarUsuario(userId: string, dadosUsuario: { nome?: string; email?: string; }): Observable<void> { // Método para atualizar um usuário
        const docRef = doc(this.db, 'usuarios', userId); // Referência para o documento do usuário
        return from(setDoc(docRef, dadosUsuario, { merge: true })); // Atualiza o documento com os novos dados e retorna um Observable
    }

    public DeletarUsuario(userId: string): Observable<void> { // Método para deletar um usuário
        const docRef = doc(this.db, 'usuarios', userId); // Referência para o documento do usuário
        return from(deleteDoc(docRef)); // Deleta o documento e retorna um Observable
    }
}

