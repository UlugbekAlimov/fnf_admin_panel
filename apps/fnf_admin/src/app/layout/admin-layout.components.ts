import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

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
}

interface NavSection {
  title?: string;
  items: NavItem[];
  path?: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, NgClass, RouterModule, BreadcrumbModule],
  templateUrl: './admin-layout.components.html',
})
export class AdminLayoutComponent {
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/management/dashboard' };
  breadcrumbs: MenuItem[] = [];

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

  sections: NavSection[] = [
    {
      items: [{ label: 'Dashboard', icon: 'pi-th-large', path: '/management/dashboard' }],
    },
    {
      title: 'Management',
      items: [
        { label: 'Companies', icon: 'pi-building', path: '/management/companies' },
        { label: 'Users & Roles', icon: 'pi-users', path: '/management/users-roles' },
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
        },
        { label: 'Groups & Enrollments', icon: 'pi-sitemap', path: '/education/groups' },
        { label: 'Tests & Assignments', icon: 'pi-shield', path: '/education/tests' },
      ],
    },
    {
      title: 'Platform',
      items: [
        { label: 'Billing & Subscriptions', icon: 'pi-credit-card', path: '/platform/billing' },
        { label: 'AI Settings', icon: 'pi-sparkles', path: '/platform/ai-settings' },
        { label: 'Notebook LLM', icon: 'pi-file', path: '/platform/notebook' },
        { label: 'Integrations', icon: 'pi-link', path: '/platform/integrations' },
        { label: 'Analytics & Logs', icon: 'pi-chart-line', path: '/platform/analytics' },
        { label: 'Marketing / CRM', icon: 'pi-megaphone', path: '/platform/marketing' },
        { label: 'Settings', icon: 'pi-cog', path: '/platform/settings' },
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
