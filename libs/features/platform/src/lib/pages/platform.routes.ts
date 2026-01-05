import { Routes } from "@angular/router";
import { Billing } from "./billing/billing";

export const platformRoutes: Routes = [
    { path: 'billing', pathMatch: 'full', component: Billing, data: { breadcrumb: 'Billing & Subscriptions' } },
]
