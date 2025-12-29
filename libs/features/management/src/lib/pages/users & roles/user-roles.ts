import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { filter } from 'rxjs';

@Component({
  selector: 'users-roles',
  standalone: true,
  imports: [TabsModule, RouterLink, RouterOutlet],
  template: `
    <h1 class="text-xl font-bold mb-5">User & Roles Management</h1>
    <p-tabs [(value)]="activeTab">
      <p-tablist class="tabs-list">
        <p-tab value="users" routerLink="users">Users</p-tab>
        <p-tab value="roles" routerLink="roles">Roles & Permissions</p-tab>
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
    `,
  ],
})
export class UserRolesPage {
  activeTab: 'users' | 'roles' = 'users';

  constructor(private router: Router) {
    this.setActiveFromUrl();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.setActiveFromUrl());
  }

  private setActiveFromUrl() {
    this.activeTab = this.router.url.includes('/roles') ? 'roles' : 'users';
  }
}
