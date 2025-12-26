import { Routes } from "@angular/router";
import { ManagementDashboard } from "./dashboard/dashboard";
import { ManagementCompanies } from "./companies/companies";
import { UsersRolesPage } from "./users & roles/users-roles";

export const managementRoutes: Routes = [
    { path: 'dashboard', component: ManagementDashboard },
    { path: 'companies', component: ManagementCompanies },
    { path: 'users-roles', component: UsersRolesPage }
]