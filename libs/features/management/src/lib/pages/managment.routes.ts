import { Routes } from "@angular/router";
import { ManagementDashboard } from "./dashboard/dashboard";
import { ManagementCompanies } from "./companies/companies";

export const managementRoutes: Routes = [
    { path: 'dashboard', component: ManagementDashboard },
    { path: 'companies', component: ManagementCompanies }
]