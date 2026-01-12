import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiTableComponent } from 'libs/shared/table/table';
import { Button } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';

@Component({
  selector: 'education-groups',
  imports: [UiTableComponent, Button, DatePicker, Select],
  templateUrl: 'groups.component.html',
})
export class GroupsComponents {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  columns: any[] = [
    { field: 'name', header: 'Course Name' },
    { field: 'city', header: 'Language' },
    { field: 'plan', header: 'Students' },
    { field: 'status', header: 'Status' },
    { field: 'created_at', header: 'Created At' },
  ];
  rowsPerPageOptions = [10, 20];
  pageSize = 10;
  currentPage = 1;
  loading = false;
  chipFields = ['status'];
  chipVariantFieldMap: Record<string, string> = {
    status: 'statusVariant',
  };
  selectedCompanies: any[] = [];
  mockCompanies = [
    {
      id: 1,
      name: 'Northwind Logistics',
      slug: 'northwind-logistics',
      logo: 'https://picsum.photos/seed/northwind/64',
      city: 'Almaty',
      plan: 'Enterprise',
      status: 'Active',
      statusVariant: 'success',
      created_at: '12.01.2025',
    },
  ];

  setPageFromPrime(event: any) {
    const rows = event?.rows ?? this.pageSize;
    const first = event?.first ?? 0;
    this.pageSize = rows;
    this.currentPage = Math.floor(first / rows) + 1;
  }

  detail(row: any) {
    if (!row?.id) return;
    this.router.navigate(['/education/groups', row.id]);
  }

  edit(_row: any) {}

  remove(_row: any) {}
}
