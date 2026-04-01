import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from '@angular/fire/auth';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  auth: Auth = inject(Auth);
  authState: any = authState(this.auth);

  async createUser(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    await signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    provider.addScope('email');
    provider.addScope('profile');

    if (Capacitor.isNativePlatform()) {
      throw new Error(
        'Google Sign-In nativo requiere un plugin de autenticacion para Capacitor. Instala y configura @capacitor-firebase/authentication antes de probar en Android o iOS.',
      );
    }

    try {
      return await signInWithPopup(this.auth, provider);
    } catch (error: any) {
      const code = error?.code as string | undefined;
      const redirectFallbackCodes = [
        'auth/popup-blocked',
        'auth/popup-closed-by-user',
        'auth/cancelled-popup-request',
        'auth/operation-not-supported-in-this-environment',
      ];

      if (code && redirectFallbackCodes.includes(code)) {
        await signInWithRedirect(this.auth, provider);
        return null;
      }

      throw error;
    }
  }
}
