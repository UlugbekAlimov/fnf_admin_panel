import { Route } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.components';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'management',
        loadChildren: () =>
          import('@fnf-admin/management').then(m => m.managementRoutes)
      },
      {
        path: 'platform',
        loadChildren: () =>
          import('@fnf-admin/platform').then(m => m.platformRoutes)
      },
      {
        path: 'companies',
        loadChildren: () =>
          import('@fnf-admin/management').then(m => m.managementRoutes)
      },
      {
        path: 'users-roles',
        loadChildren: () =>
          import('@fnf-admin/management').then(m => m.managementRoutes)
      },
    ],
  },
];
