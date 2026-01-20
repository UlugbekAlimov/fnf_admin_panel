export type Role = 'superadmin' | 'admin' | 'teacher' | 'company';

export const ROLES: Record<string, Role> = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  TEACHER: 'teacher',
  COMPANY: 'company',
} as const;
