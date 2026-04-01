import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  auth: Auth = inject(Auth);
  authState: any = authState(this.auth);

  constructor() { }

  async createUser(email:string, password:string){
    const user = await createUserWithEmailAndPassword(this.auth, email, password);
    return user;
  }

  async login(email:string, password:string){
    const user = await signInWithEmailAndPassword(this.auth, email, password);
    return user;
  }

  async logout(){
    await signOut(this.auth);
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    return await signInWithPopup(this.auth, provider);
  }

}
