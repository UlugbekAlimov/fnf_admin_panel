import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterLink, RouterOutlet } from "@angular/router";
import { TabsModule } from "primeng/tabs";
import { filter } from "rxjs";

@Component({
  selector: "platform-billing-subscription-tabs",
  standalone: true,
  imports: [TabsModule, RouterLink, RouterOutlet],
  template: `
    <header class="flex flex-col gap-3">
      <h1 class="text-3xl font-semibold text-slate-900 md:text-4xl">Billing & Subscription</h1>
    </header>
    <p-tabs [(value)]="activeTab" class="mt-4">
      <p-tablist class="tabs-list">
        <p-tab value="billing" routerLink="billing">Billing</p-tab>
        <p-tab value="subscription" routerLink="subscription">Subscription</p-tab>
      </p-tablist>
    </p-tabs>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host ::ng-deep .tabs-list.p-tablist {
        background: transparent;
        border-bottom: 0;
      }
      :host ::ng-deep .tabs-list .p-tablist-tab-list {
        display: flex;
        gap: 1.5rem;
      }
      :host ::ng-deep .p-tab {
        padding: 1rem 0rem;
      }
      :host ::ng-deep .p-tablist::after {
        display: none;
      }
      :host ::ng-deep .p-tab {
        background: transparent;
      }
    `
  ]
})
export class BillingSubscriptionTabsPage {
  activeTab: "billing" | "subscription" = "billing";


  constructor(private router: Router) {
    this.setActiveFromUrl();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.setActiveFromUrl());
  }

  private setActiveFromUrl() {
    const url = this.router.url;
    if (url.includes("/subscription")) {
      this.activeTab = "subscription";
      return;
    }
    if (url.includes("/billing")) {
      this.activeTab = "billing";
      return;
    }
    this.activeTab = "billing";
  }
}
