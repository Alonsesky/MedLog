import { UserRole } from './userRole.model';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  providerId: string;
  role?: UserRole;
  isActive?: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
  //photoURL?: string | null;
  //emailVerified?: boolean;
}
