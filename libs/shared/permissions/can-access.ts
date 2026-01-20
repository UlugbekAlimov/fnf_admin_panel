import { Permission } from './permissions';
import { ROLE_PERMISSIONS } from './role-matrix';
import { Role } from './roles';

export function canAccess(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
