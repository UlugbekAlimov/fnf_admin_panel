import { Routes } from "@angular/router";
import { AiSettingsPage } from "./ai-settings/ai-settings";
import { BillingComponent } from "./billing-subscription/features/ui/billing/billing";
import { BillingSubscriptionTabsPage } from "./billing-subscription/billing-subscription";
import { Subscription } from "./billing-subscription/features/ui/subscription/subscription";
import { NotebookLlmPage } from "./notebook-llm/notebook-llm";

export const platformRoutes: Routes = [
  {
    path: "",
    component: BillingSubscriptionTabsPage,
    children: [
      { path: "", pathMatch: "full", redirectTo: "billing" },
      { path: "billing", component: BillingComponent, data: { breadcrumb: "Billing" } },
      { path: "subscription", component: Subscription, data: { breadcrumb: "Subscription" } }
    ]
  },
  { path: "ai-settings", component: AiSettingsPage, data: { breadcrumb: "AI Settings" } },
  { path: "notebook", component: NotebookLlmPage, data: { breadcrumb: "Notebook LLM" } }
];
