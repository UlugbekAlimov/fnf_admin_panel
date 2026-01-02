import { Routes } from "@angular/router";
import { ManagementDashboard } from "./dashboard/dashboard";
import { ManagementCompanies } from "./companies/companies";
import { UserRolesPage } from "./users & roles/user-roles";
import { UsersPage } from "./users & roles/users";
import { RolesPage } from "./users & roles/roles";

export const managementRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', component: ManagementDashboard, data: { breadcrumb: 'Dashboard' } },
    { path: 'companies', pathMatch: 'full', component: ManagementCompanies, data: { breadcrumb: 'Companies' } },
    { path: 'users', pathMatch: 'full', redirectTo: 'users-roles/users' },
    { path: 'roles', pathMatch: 'full', redirectTo: 'users-roles/roles' },
    {
        path: 'users-roles',
        component: UserRolesPage,
        data: { breadcrumb: 'Users & Roles' },
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'users' },
            { path: 'users', component: UsersPage, data: { breadcrumb: 'Users' } },
            { path: 'roles', component: RolesPage, data: { breadcrumb: 'Roles' } },
        ],
    },
]
