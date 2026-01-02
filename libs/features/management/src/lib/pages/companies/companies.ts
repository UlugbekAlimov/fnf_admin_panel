import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiTableComponent } from '../../../../../../shared/table/table';
import { CompaniesCreate } from './company-create/company-create';
import { CompanyDelete } from './company-delete/company-delete';
import { CompanyEdit } from './company-edit/company-edit';
import { CompanyDetail } from './company-detail/company-detail';

import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'management-companies',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    FormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    UiTableComponent,

    CompaniesCreate,
    CompanyEdit,
    CompanyDelete,
    CompanyDetail,
  ],
  templateUrl: './companies.html',
  styleUrls: ['./companies.css'],
})
export class ManagementCompanies implements OnInit {
  showDialog: boolean = false;
  showEditDialog = false;
  showDeleteDialog = false;
  showDetailDrawer = false;
  selectedCompany: any | null = null;
  items: any[] | undefined;

  ngOnInit() {}
  searchTerm = '';

  date: Date | undefined;

  dates: Date[] | undefined;

  products = [
    {
      id: 1,
      name: 'Acme Corp',
      slug: 'acme-corp',
      createdAt: '2023-01-12',
      email: 'admin@acme.com',
      plan: 'Enterprise',
      usersCount: 120,
      seatsUsed: 1240,
      seatsTotal: 2000,
      storageUsed: 450,
      storageTotal: 1024,
      status: 'Active',
      country: 'USA',
      label_name: 'Enterprise',
      logo: '/favicon.ico',
      statusVariant: 'success',
    },
    {
      id: 2,
      name: 'Globex',
      slug: 'globex',
      createdAt: '2023-03-02',
      email: 'admin@globex.com',
      plan: 'Pro Team',
      usersCount: 48,
      seatsUsed: 340,
      seatsTotal: 800,
      storageUsed: 120,
      storageTotal: 512,
      status: 'Inactive',
      country: 'Germany',
      label_name: 'Pro Team',
      logo: '/favicon.ico',
      statusVariant: 'danger',
    },
    {
      id: 3,
      name: 'Initech',
      slug: 'initech',
      createdAt: '2023-05-20',
      email: 'admin@initech.com',
      plan: 'Startup',
      usersCount: 8,
      seatsUsed: 20,
      seatsTotal: 100,
      storageUsed: 32,
      storageTotal: 256,
      status: 'Active',
      country: 'Canada',
      label_name: 'Startup',
      logo: '/favicon.ico',
      statusVariant: 'success',
    },
  ];

  plans = [{ name: 'Enterprise' }, { name: 'Pro Team' }, { name: 'Startup' }];
  cities = [{ name: 'USA' }, { name: 'Germany' }, { name: 'Canada' }];
  selectedPlan: { name: string } | null = null;
  selectedCity: { name: string } | null = null;

  tableColumns = [
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'country', header: 'Country' },
    { field: 'label_name', header: 'Label' },
  ];
  totalRecords = 120;
  rowsPerPageOptions = [10, 20, 30];

  chipFields = ['status'];
  chipVariantFieldMap = { status: 'statusVariant' };

  get filteredProducts() {
    const term = this.searchTerm.trim().toLowerCase();
    return this.products.filter((product) => {
      if (term && !product.name.toLowerCase().includes(term)) {
        return false;
      }
      if (this.selectedPlan && product.label_name !== this.selectedPlan.name) {
        return false;
      }
      if (this.selectedCity && product.country !== this.selectedCity.name) {
        return false;
      }
      return true;
    });
  }

  edit(row: any) {
    this.selectedCompany = row;
    this.showEditDialog = true;
  }

  remove(row: any) {
    this.selectedCompany = row;
    this.showDeleteDialog = true;
  }

  detail(row: any) {
    this.selectedCompany = row;
    this.showDetailDrawer = true;
  }

  updateCompany(updated: any) {
    this.products = this.products.map((product) =>
      product.id === updated.id ? { ...product, ...updated } : product,
    );
  }

  confirmDelete(company: any) {
    this.products = this.products.filter((product) => product.id !== company.id);
  }

}
