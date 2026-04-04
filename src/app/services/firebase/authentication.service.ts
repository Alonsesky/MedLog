import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';
import { UserRole } from 'src/app/shared/models/userRole.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private auth: Auth = inject(Auth);
  private firestore = inject(Firestore);

  authState = authState(this.auth);
  currentUser$: Observable<UserModel | null> = user(this.auth).pipe(
    switchMap((firebaseUser) => {
      if (!firebaseUser) {
        return of(null);
      }

      const userRef = doc(this.firestore, `users/${firebaseUser.uid}`);
      return docData(userRef, { idField: 'uid' }) as Observable<UserModel | null>;
    }),
  );

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

  async getUserRole(): Promise<UserRole | null> {
    const currentUser = this.auth.currentUser;

    if (!currentUser) {
      return null;
    }

    const tokenResult = await currentUser.getIdTokenResult(true);
    return (tokenResult.claims['role'] as UserRole | undefined) ?? null;
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

}
