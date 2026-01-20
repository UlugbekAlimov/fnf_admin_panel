import { Permission } from './permissions';
import { Role } from './roles';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  superadmin: [
    'dashboard.view',
    'companies.view',
    'billing.view',
    'notebook.view',
    'ai_settings.view',
    'settings.view',
  ],
  admin: [
    'dashboard.view',
    'companies.view',
    'users_roles.view',
    'courses.view',
    'groups.view',
    'tests.view',
    'settings.view',
  ],
  teacher: ['dashboard.view', 'courses.view', 'groups.view', 'tests.view'],
  company: ['dashboard.view', 'companies.view'],
};
