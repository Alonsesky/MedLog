export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  providerId: string;
  createdAt?: unknown;
  updatedAt?: unknown;
  //photoURL?: string | null;
  //emailVerified?: boolean;
}
