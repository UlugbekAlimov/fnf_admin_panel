import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { canAccess, Permission, Role } from '@fnf-admin/permissions';

type IconName =
  | 'pi-th-large'
  | 'pi-building'
  | 'pi-users'
  | 'pi-book'
  | 'pi-sitemap'
  | 'pi-shield'
  | 'pi-credit-card'
  | 'pi-sparkles'
  | 'pi-file'
  | 'pi-link'
  | 'pi-chart-line'
  | 'pi-megaphone'
  | 'pi-cog';

interface NavItem {
  label: string;
  icon: IconName;
  path?: string;
  activePaths?: string[];
  permission?: Permission;
}

interface NavSection {
  title?: string;
  items: NavItem[];
  path?: string;
}

interface RoleOption {
  label: string;
  value: Role;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, NgClass, RouterModule, BreadcrumbModule],
  templateUrl: './admin-layout.components.html',
})
export class AdminLayoutComponent implements OnInit {
  private readonly ROLE_STORAGE_KEY = 'fnf_admin_active_role';
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/management/dashboard' };
  breadcrumbs: MenuItem[] = [];
  roles: RoleOption[] = [
    { label: 'Global (Super Admin)', value: 'superadmin' },
    { label: 'Admin', value: 'admin' },
    { label: 'Teacher', value: 'teacher' },
    // { label: 'Company', value: 'company' },
  ];
  activeRole = this.roles[0];
  isRoleMenuOpen = false;
  isLoading = true;

  toggleRoleMenu() {
    this.isRoleMenuOpen = !this.isRoleMenuOpen;
  }

  selectRole(role: RoleOption) {
    this.activeRole = role;
    this.persistRole(role);
    this.isRoleMenuOpen = false;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
      });
  }

  ngOnInit(): void {
    const storedRole = this.readStoredRole();
    if (storedRole) {
      this.activeRole = storedRole;
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  sections: NavSection[] = [
    {
      items: [
        {
          label: 'Dashboard',
          icon: 'pi-th-large',
          path: '/management/dashboard',
          permission: 'dashboard.view',
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          label: 'Companies',
          icon: 'pi-building',
          path: '/management/companies',
          permission: 'companies.view',
        },
        {
          label: 'Users & Roles',
          icon: 'pi-users',
          path: '/management/users-roles',
          permission: 'users_roles.view',
        },
      ],
    },
    {
      title: 'Education',
      items: [
        {
          label: 'Courses & Content',
          icon: 'pi-book',
          path: '/education/courses',
          activePaths: ['/education/courses', '/education/content'],
          permission: 'courses.view',
        },
        {
          label: 'Groups & Enrollments',
          icon: 'pi-sitemap',
          path: '/education/groups',
          permission: 'groups.view',
        },
        {
          label: 'Tests & Assignments',
          icon: 'pi-shield',
          path: '/education/tests',
          permission: 'tests.view',
        },
      ],
    },
    {
      title: 'Platform',
      items: [
        {
          label: 'Billing & Subscriptions',
          icon: 'pi-credit-card',
          path: '/platform/billing',
          permission: 'billing.view',
        },
        {
          label: 'AI Settings',
          icon: 'pi-sparkles',
          path: '/platform/ai-settings',
          permission: 'ai_settings.view',
        },
        {
          label: 'Notebook LLM',
          icon: 'pi-file',
          path: '/platform/notebook',
          permission: 'notebook.view',
        },
        {
          label: 'Integrations',
          icon: 'pi-link',
          path: '/platform/integrations',
          permission: 'integrations.view',
        },
        {
          label: 'Analytics & Logs',
          icon: 'pi-chart-line',
          path: '/platform/analytics',
          permission: 'analytics.view',
        },
        {
          label: 'Marketing / CRM',
          icon: 'pi-megaphone',
          path: '/platform/marketing',
          permission: 'marketing.view',
        },
        {
          label: 'Settings',
          icon: 'pi-cog',
          path: '/platform/settings',
          permission: 'settings.view',
        },
      ],
    },
  ];

  activeLabel = 'Dashboard';

  getRouterLink(sectionTitle: string | undefined, label: string): string {
    if (!sectionTitle) return '/' + label.toLowerCase();
    return `/${sectionTitle.toLowerCase()}/${label.toLowerCase().replace(/\s+/g, '-')}`;
  }

  setActive(label: string) {
    this.activeLabel = label;
  }

  isActive(label: string): boolean {
    const item = this.sections
      .flatMap((s) => s.items)
      .find((i) => i.label === label);

    if (!item?.path) return false;

    const activePaths = item.activePaths?.length ? item.activePaths : [item.path];
    return activePaths.some((path) => this.router.url.startsWith(path));
  }

  isItemVisible(item: NavItem): boolean {
    if (!item.permission) return true;
    return canAccess(this.activeRole.value, item.permission);
  }

  hasVisibleItems(section: NavSection): boolean {
    return section.items.some((item) => this.isItemVisible(item));
  }

  private readStoredRole(): RoleOption | null {
    try {
      const raw = localStorage.getItem(this.ROLE_STORAGE_KEY);
      if (!raw) return null;
      return this.roles.find((role) => role.value === (raw as Role)) ?? null;
    } catch {
      return null;
    }
  }

  private persistRole(role: RoleOption): void {
    try {
      localStorage.setItem(this.ROLE_STORAGE_KEY, role.value);
    } catch {
      // ignore storage errors
    }
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children = route.children;

    if (!children || children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const snapshot = child.snapshot;
      const routeURL = snapshot?.url?.map((segment) => segment.path).join('/') ?? '';
      if (routeURL) {
        url += `/${routeURL}`;
      }

      const routeData = snapshot?.routeConfig?.data;
      const rawLabel = routeData?.['breadcrumb'];
      const label = typeof rawLabel === 'function' ? rawLabel(snapshot) : rawLabel;
      if (label) {
        breadcrumbs.push({ label, routerLink: url });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
