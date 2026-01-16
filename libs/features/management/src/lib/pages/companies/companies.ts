import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiTableComponent } from '../../../../../../shared/table/table';
import { CompaniesCreate } from './features/ui/company-create/company-create';
import { CompanyDetail } from './features/ui/company-detail/company-detail';
import { CompanyDelete } from './features/ui/company-delete/company-delete';
import { formatDate } from '../../../../../../shared/date/formatDate';

import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { PaginatorState } from 'primeng/paginator';
import { CompanyApiItem } from './features/model/company.model';
import { CompaniesStore } from './features/model/company.store';
import { Card } from "primeng/card";
@Component({
  selector: 'management-companies',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    InputTextModule,
    FormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    UiTableComponent,
    CompaniesCreate,
    CompanyDelete,
    CompanyDetail,
    Card
],
  templateUrl: './companies.html',
  styleUrls: ['./companies.css'],
})
export class ManagementCompanies implements OnInit {
  showDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;
  showDetailDrawer = false;

  selectedCompany: any | null = null;
  selectedCompanies: any[] = [];
  selectedCompanyId: CompanyApiItem['id'] | null = null;

  editingCompany: any | null = null;

  constructor(public store: CompaniesStore) {}

  ngOnInit() {
    this.store.load(1);
  }

  get searchTerm() {
    return this.store.searchTerm();
  }
  set searchTerm(v: string) {
    this.store.searchTerm.set(v);
  }

  get selectedPlan() {
    return this.store.selectedPlan();
  }
  set selectedPlan(v: { name: string } | null) {
    this.store.selectedPlan.set(v);
  }

  get selectedCity() {
    return this.store.selectedCity();
  }
  set selectedCity(v: { name: string } | null) {
    this.store.selectedCity.set(v);
  }

  get dates() {
    return this.store.dates();
  }
  set dates(v: Date[] | undefined) {
    this.store.dates.set(v);
  }

  plans = [{ name: 'Enterprise' }, { name: 'Pro Team' }, { name: 'Startup' }];
  cities = [{ name: 'USA' }, { name: 'Germany' }, { name: 'Canada' }];

  tableColumns = [
    { field: 'name', header: 'Name' },
    { field: 'slug', header: 'Slug' },
    { field: 'status', header: 'Status' },
    { field: 'country', header: 'Country' },
    { field: 'timezone', header: 'Timezone' },
    { field: 'created_at', header: 'Created At' },
    { field: 'updated_at', header: 'Updated At' },
  ];

  rowsPerPageOptions = [10, 20];
  chipFields = ['status'];
  chipVariantFieldMap = { status: 'statusVariant' };

  detail(row: any) {
    this.selectedCompanyId = row.id;
    this.showDetailDrawer = true;
  }

  onPageChange(event: PaginatorState) {
    this.store.setPageFromPrime(event);
  }

  onRefresh() {
    this.store.refresh();
  }

  edit(row: any) {
    this.editingCompany = row;
    this.store.openEdit({ id: row.id });
    this.showDialog = true;
  }

  create() {
    this.editingCompany = null;
    this.store.openCreate();
    this.showDialog = true;
  }

  remove(row: any) {
    this.selectedCompany = row;
    this.selectedCompanies = [];
    this.store.openDelete({ id: row.id });
    this.showDeleteDialog = true;
  }

  bulkRemove() {
    if (this.selectedCompanies.length < 2) return;
    this.selectedCompany = null;
    this.showDeleteDialog = true;
  }

  confirmDelete(target?: any) {
    const items = Array.isArray(target)
      ? target
      : target
        ? [target]
        : this.selectedCompany
          ? [this.selectedCompany]
          : this.selectedCompanies;
    const ids = items.map((item: any) => item?.id).filter(Boolean);
    if (!ids.length) return;

    if (ids.length > 1) {
      this.store.deleteMany(ids, {
        closeOnSuccess: () => {
          this.showDeleteDialog = false;
          this.selectedCompanies = [];
        },
        refresh: true,
      });
      return;
    }

    this.store.delete({
      closeOnSuccess: () => {
        this.showDeleteDialog = false;
        this.selectedCompany = null;
      },
      refresh: true,
    });
  }

  onDialogVisibleChange(v: boolean) {
    this.showDialog = v;
    if (!v) this.editingCompany = null;
  }

  onDeleteDialogVisibleChange(v: boolean) {
    this.showDeleteDialog = v;
    if (!v) {
      this.selectedCompany = null;
      this.selectedCompanies = [];
    }
  }
}
