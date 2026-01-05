import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ChipComponent } from '../../../../../../shared/chip/chip';
import { CompanyDetail } from '../companies/company-detail/company-detail';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Select } from 'primeng/select';

@Component({
  selector: 'management-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, Select, ChipComponent, CompanyDetail],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class ManagementDashboard {
  showDetailDrawer = false;

  topCompanies = [
    {
      id: 1,
      name: 'Acme Corp',
      slug: 'acme-corp',
      createdAt: '2023-01-12',
      email: 'admin@acme.com',
      plan: 'Enterprise',
      usersCount: 1240,
      seatsUsed: 1240,
      seatsTotal: 2000,
      storageUsed: 450,
      storageTotal: 1024,
      status: 'Active',
      country: 'USA',
      label_name: 'Enterprise',
      logo: '/favicon.ico',
      statusVariant: 'success',
      usageHours: '8,420 hrs',
      initial: 'A',
      badgeClass: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 2,
      name: 'TechFlow Inc.',
      slug: 'techflow',
      createdAt: '2023-03-02',
      email: 'admin@techflow.com',
      plan: 'Pro Team',
      usersCount: 860,
      seatsUsed: 860,
      seatsTotal: 1200,
      storageUsed: 300,
      storageTotal: 768,
      status: 'Active',
      country: 'USA',
      label_name: 'Pro Team',
      logo: '/favicon.ico',
      statusVariant: 'success',
      usageHours: '5,310 hrs',
      initial: 'T',
      badgeClass: 'bg-sky-100 text-sky-700',
    },
    {
      id: 3,
      name: 'Startup Lab',
      slug: 'startup-lab',
      createdAt: '2023-05-20',
      email: 'admin@startuplab.com',
      plan: 'Startup',
      usersCount: 420,
      seatsUsed: 420,
      seatsTotal: 800,
      storageUsed: 180,
      storageTotal: 512,
      status: 'Active',
      country: 'Germany',
      label_name: 'Startup',
      logo: '/favicon.ico',
      statusVariant: 'success',
      usageHours: '2,180 hrs',
      initial: 'S',
      badgeClass: 'bg-amber-100 text-amber-700',
    },
    {
      id: 4,
      name: 'FinTech Solutions',
      slug: 'fintech-solutions',
      createdAt: '2023-06-14',
      email: 'admin@fintech.com',
      plan: 'Enterprise',
      usersCount: 1050,
      seatsUsed: 1050,
      seatsTotal: 1600,
      storageUsed: 520,
      storageTotal: 1024,
      status: 'Active',
      country: 'Canada',
      label_name: 'Enterprise',
      logo: '/favicon.ico',
      statusVariant: 'success',
      usageHours: '7,120 hrs',
      initial: 'F',
      badgeClass: 'bg-violet-100 text-violet-700',
    },
  ];

  openCompanyDetail(company: any) {
    void company;
    this.showDetailDrawer = true;
  }
}
