import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

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
}

interface NavSection {
  title?: string;
  items: NavItem[];
  path?: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, NgClass, RouterModule],
  templateUrl: './admin-layout.components.html',
})
export class AdminLayoutComponent {
  constructor(private router: Router) {}

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
        { label: 'Courses & Content', icon: 'pi-book', path: '/education/courses' },
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

    return this.router.url.startsWith(item.path);
  }
}