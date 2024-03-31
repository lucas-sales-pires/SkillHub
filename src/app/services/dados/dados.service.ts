import { Injectable } from '@angular/core';
import {
    Firestore,
    collection,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    DocumentData,
    docData,
    DocumentReference,
    collectionData,
} from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private db: Firestore) {}

    public getAllUsers(): Observable<any[]> {
        const collectionRef = collection(this.db, 'usuarios');
        return collectionData(collectionRef, { idField: 'id' });
    }

    public getUserById(userId: string): Observable<any> {
        const docRef = doc(this.db, 'usuarios', userId);
        return docData(docRef, { idField: 'id' });
    }

    public createUser(userData: { nome: string; email: string; senha: string }): Observable<DocumentReference<DocumentData>> {
        const collectionRef = collection(this.db, 'usuarios');
        return from(addDoc(collectionRef, userData));
    }

    public updateUser(userId: string, userData: { nome?: string; email?: string; senha?: string }): Observable<void> {
        const docRef = doc(this.db, 'usuarios', userId);
        return from(setDoc(docRef, userData, { merge: true }));
    }

    public deleteUser(userId: string): Observable<void> {
        const docRef = doc(this.db, 'usuarios', userId);
        return from(deleteDoc(docRef));
    }
}

