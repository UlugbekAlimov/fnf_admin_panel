import { Routes } from "@angular/router";
import { BillingComponent } from "./billing-subscription/features/ui/billing/billing";
import { BillingSubscriptionTabsPage } from "./billing-subscription/billing-subscription";
import { Subscription } from "./billing-subscription/features/ui/subscription/subscription";

export const platformRoutes: Routes = [
  {
    path: "",
    component: BillingSubscriptionTabsPage,
    children: [
      { path: "", pathMatch: "full", redirectTo: "billing" },
      { path: "billing", component: BillingComponent },
      { path: "subscription", component: Subscription }
    ]
  }
];
