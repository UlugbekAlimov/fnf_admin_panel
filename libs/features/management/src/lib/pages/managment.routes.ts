import { Routes } from "@angular/router";
import { ManagementDashboard } from "./dashboard/dashboard";
import { ManagementCompanies } from "./companies/companies";
import { UserRolesPage } from "./users & roles/user-roles";
import { UsersPage } from "./users & roles/users";
import { RolesPage } from "./users & roles/roles";

export const managementRoutes: Routes = [
    { path: 'dashboard', component: ManagementDashboard },
    { path: 'companies', pathMatch: 'full', component: ManagementCompanies },
    { path: 'users', pathMatch: 'full', redirectTo: 'users-roles/users' },
    { path: 'roles', pathMatch: 'full', redirectTo: 'users-roles/roles' },
    {
        path: 'users-roles',
        component: UserRolesPage,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'users' },
            { path: 'users', component: UsersPage },
            { path: 'roles', component: RolesPage },
        ],
    },
]
