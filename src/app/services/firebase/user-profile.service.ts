import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  doc,
  Firestore,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { UserProfile } from 'src/app/shared/models/userProfile.model';
import { UserRole } from 'src/app/shared/models/userRole.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {

  private firestore = inject(Firestore);

  async saveUserProfile(profile: UserProfile, role: UserRole = 'patient'): Promise<void> {
    const userRef = doc(this.firestore, `users/${profile.uid}`);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        ...profile,
        role,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return;
    }

    await updateDoc(userRef, {
      email: profile.email,
      displayName: profile.displayName,
      providerId: profile.providerId,
      role: profile.role ?? snapshot.data()['role'] ?? role,
      isActive: profile.isActive ?? snapshot.data()['isActive'] ?? true,
      updatedAt: serverTimestamp(),
    });
  }

  mapUser(user: User, role: UserRole = 'patient'): UserProfile {
    return {
      uid: user.uid,
      email: user.email ?? null,
      displayName: user.displayName ?? null,
      providerId: user.providerData?.[0]?.providerId ?? 'password',
      role,
      isActive: true,
    };
  }
}
