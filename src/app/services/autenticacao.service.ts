import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  register(email: string, password: string): Promise<auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }


  
  login(email: string, password: string): Promise<auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
