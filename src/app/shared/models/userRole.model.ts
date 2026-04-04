export type UserRole = 'admin' | 'medic' | 'patient';

export const  ROLE_HIERARCHY: Record<UserRole, number> = {
  'admin': 3,
  'medic': 2,
  'patient': 1,
};
