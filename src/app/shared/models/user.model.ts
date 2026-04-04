import { UserRole } from './userRole.model';

export interface UserModel {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Date | unknown;
  updatedAt?: Date | unknown;
  isActive: boolean;
}
