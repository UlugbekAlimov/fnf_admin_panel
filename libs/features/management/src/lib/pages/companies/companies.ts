import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiTableComponent } from '../../../../../../shared/table/table';
import { CompaniesCreate } from './company-create/company-create';
import { CompanyDelete } from './company-delete/company-delete';
import { CompanyEdit } from './company-edit/company-edit';
import { CompanyDetail } from './company-detail/company-detail';
import { formatDate } from "../../../../../../shared/date/formatDate"

import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { PaginatorState } from 'primeng/paginator';
import { CompanyApiItem, CompanyTable } from './core/company.model';
import { CompanyService } from './core/company.service';
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
  selectedCompanyId: string | null = null;
  items: any[] | undefined;
  currentPage = 1;
  pageSize = 10;
  loading = false;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.loadCompanies(1);
  }
  searchTerm = '';
  date: Date | undefined;
  dates: Date[] | undefined;
  companies: CompanyTable[] = [];

  plans = [{ name: 'Enterprise' }, { name: 'Pro Team' }, { name: 'Startup' }];
  cities = [{ name: 'USA' }, { name: 'Germany' }, { name: 'Canada' }];
  selectedPlan: { name: string } | null = null;
  selectedCity: { name: string } | null = null;

  tableColumns = [
    { field: 'name', header: 'Name' },
    { field: 'slug', header: 'Slug' },
    { field: 'status', header: 'Status' },
    { field: 'country', header: 'Country' },
    { field: 'legal_name', header: 'Legal Name' },
    { field: 'created_at', header: 'Created At' },
    { field: 'updated_at', header: 'Updated At' },
  ];
  
  totalRecords = 0;
  rowsPerPageOptions = [10, 20];

  chipFields = ['status'];
  chipVariantFieldMap = { status: 'statusVariant' };

  get filteredProducts() {
    const term = this.searchTerm.trim().toLowerCase();
    return this.companies.filter((product) => {
      if (term && !product.name.toLowerCase().includes(term)) {
        return false;
      }
      if (this.selectedPlan && product.legal_name !== this.selectedPlan.name) {
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

  onPageChange(event: PaginatorState) {
    const page = (event.page ?? 0) + 1;
    this.pageSize = event.rows ?? this.pageSize;
    this.loadCompanies(page);
  }

  loadCompanies(page: number) {
    this.loading = true;
    this.companyService.getCompaniesByPage(page, this.pageSize).subscribe({
      next: (response) => {
        const raw = response as unknown as { data?: CompanyApiItem[]; total?: number; page?: number } | CompanyApiItem[];
        const data = Array.isArray(raw)
          ? raw
          : raw?.data ?? (raw as { items?: CompanyApiItem[]; results?: CompanyApiItem[] }).items ?? (raw as { results?: CompanyApiItem[] }).results ?? [];
        this.currentPage = (raw as { page?: number })?.page ?? page;
        this.totalRecords = (raw as { total?: number })?.total ?? data.length;
        this.companies = data.map((company) => this.mapCompany(company));
        this.loading = false;
      },
      error: () => {
        this.companies = [];
        this.totalRecords = 0;
        this.loading = false;
      },
    });
  }

  onRefresh() {
    this.loadCompanies(this.currentPage);
  }

  private mapCompany(company: CompanyApiItem): CompanyTable {
    const statusLabel = company.status === 'active' ? 'Active' : 'Inactive';
    return {
      id: company.id,
      name: company.name,
      slug: company.slug,
      status: statusLabel,
      country: company.country ?? '',
      legal_name: company.legal_name ?? '',
      created_at: formatDate(company.created_at),
      updated_at: formatDate(company.updated_at),
      logo: company.logo_url ?? '/favicon.ico',
      statusVariant: company.status === 'active' ? 'success' : 'secondary',
    };
  }

  detail(row: any) {
    this.selectedCompanyId = String(row.id);
    this.showDetailDrawer = true;
  }

  updateCompany(updated: any) {
    this.companies = this.companies.map((product) =>
      product.id === updated.id ? { ...product, ...updated } : product,
    );
  }

  confirmDelete(company: any) {
    this.companies = this.companies.filter((product) => product.id !== company.id);
  }
}
