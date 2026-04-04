export type Permission =
  | 'view:all-patients'
  | 'edit:medical-records'
  | 'view:own-records'
  | 'manage:users';

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: ['view:all-patients', 'edit:medical-records', 'view:own-records', 'manage:users'],
  medic: ['view:all-patients', 'edit:medical-records', 'view:own-records'],
  patient: ['view:own-records'],
};
