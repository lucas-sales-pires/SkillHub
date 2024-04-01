import { Injectable } from '@angular/core';
import {Firestore,collection,doc,addDoc,setDoc,deleteDoc,DocumentData,docData,DocumentReference,collectionData,} from '@angular/fire/firestore';

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

    public PegarUsuarioPorId(userId: string): Observable<any> {
        const docRef = doc(this.db, 'usuarios', userId);
        return docData(docRef, { idField: 'id' });
    }

    public CriarUsuario(dadosUsuario: { nome: string; email: string; senha: string }): Observable<DocumentReference<DocumentData>> {
        const collectionRef = collection(this.db, 'usuarios');
        return from(addDoc(collectionRef, dadosUsuario));
    }

    public AtualizarUsuario(userId: string, dadosUsuario: { nome?: string; email?: string; senha?: string }): Observable<void> {
        const docRef = doc(this.db, 'usuarios', userId);
        return from(setDoc(docRef, dadosUsuario, { merge: true }));
    }

    public DeletarUsuario(userId: string): Observable<void> {
        const docRef = doc(this.db, 'usuarios', userId);
        return from(deleteDoc(docRef));
    }
}

