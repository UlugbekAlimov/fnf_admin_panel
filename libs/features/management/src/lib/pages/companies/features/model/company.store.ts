import { formatDate } from '../../../../../../../../shared/date/formatDate';
import { Injectable, computed, signal } from '@angular/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { CompanyService } from '../data-access/company.service';
import { CompanyApiItem, CompanyCreate, CompanyUpdate } from './company.model';
import { ToastService } from '../../../../../../../../shared/toast/toast.service';
import { StatusEnum } from '@fnf_admin/core';

@Injectable({ providedIn: 'root' })
export class CompaniesStore {
  constructor(
    private companyService: CompanyService,
    private toast: ToastService,
  ) {}

  // pagination
  readonly currentPage = signal(1);
  readonly pageSize = signal(10);
  readonly totalRecords = signal(0);

  // request state
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // request state (create)
  readonly dialogMode = signal<'create' | 'edit'>('create');
  readonly editingId = signal<string | null>(null);
  readonly creating = signal(false);
  readonly createError = signal<string | null>(null);

  // raw api items
  private readonly apiItems = signal<CompanyApiItem[]>([]);

  // delete state
  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);
  readonly deletingId = signal<string | null>(null);

  // filters
  readonly searchTerm = signal('');
  readonly selectedPlan = signal<{ name: string } | null>(null);
  readonly selectedCity = signal<{ name: string } | null>(null);
  readonly dates = signal<Date[] | undefined>(undefined);

  // map
  readonly companies = computed(() => this.apiItems().map((c) => this.mapCompany(c)));

  readonly filteredCompanies = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const plan = this.selectedPlan()?.name ?? null;
    const city = this.selectedCity()?.name ?? null;

    return this.companies().filter((x) => {
      if (term && !x.name.toLowerCase().includes(term)) return false;
      if (plan && x.legal_name !== plan) return false;
      if (city && x.country !== city) return false;
      return true;
    });
  });

  load(page?: number) {
    const p = page ?? this.currentPage();
    const size = this.pageSize();

    this.loading.set(true);
    this.error.set(null);

    this.companyService
      .getCompaniesByPage(p, size)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.currentPage.set(res.page);
          this.totalRecords.set(res.total);
          this.apiItems.set(res.data);
        },
        error: (e) => {
          this.apiItems.set([]);
          this.totalRecords.set(0);
          this.error.set(e?.message ?? 'Load failed');
        },
      });
  }

  refresh() {
    this.load(this.currentPage());
  }

  setPageFromPrime(event: any) {
    const page = (event.page ?? 0) + 1;
    const rows = event.rows ?? this.pageSize();
    this.pageSize.set(rows);
    this.load(page);
  }

  private mapCompany(company: CompanyApiItem): any {
    const statusRaw = (company.status ?? '').toString();
    const statusNormalized = statusRaw.toUpperCase();
    const statusLabel =
      statusNormalized === StatusEnum.active
        ? 'Active'
        : statusNormalized === StatusEnum.archive
          ? 'Archive'
          : statusRaw || '-';
    const statusVariant =
      statusNormalized === StatusEnum.active
        ? 'success'
        : statusNormalized === StatusEnum.archive
          ? 'danger'
          : 'info';
    return {
      id: company.id,
      name: company.name,
      slug: company.slug,
      status: statusLabel,
      country: company.country ?? '',
      timezone: company.timezone ?? '',
      created_at: formatDate(company.created_at),
      updated_at: formatDate(company.updated_at),
      logo: company.logo_url ?? '/favicon.ico',
      statusVariant,
    };
  }

  create(dto: CompanyCreate, opts?: { closeOnSuccess?: () => void; refresh?: boolean }) {
    this.creating.set(true);
    this.createError.set(null);

    this.companyService
      .createCompany(dto)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: () => {
          this.toast.success('Success', 'Company created');

          if (opts?.refresh !== false) this.refresh();

          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          const msg = e?.error?.message || e?.message || 'Failed to create company';
          this.createError.set(msg);
          this.toast.error('Error', msg);
        },
      });
  }

  update(dto: CompanyUpdate, opts?: { closeOnSuccess?: () => void; refresh?: boolean }) {
    const id = this.editingId();
    if (!id) return;

    this.creating.set(true);
    this.createError.set(null);

    this.companyService
      .updateCompany(id, dto)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: () => {
          this.toast.success('Success', 'Company updated');
          if (opts?.refresh !== false) this.refresh();
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          const msg = e?.error?.message || e?.message || 'Failed to update company';
          this.createError.set(msg);
          this.toast.error('Error', msg);
        },
      });
  }

  delete(opts?: { closeOnSuccess?: () => void; refresh?: boolean }) {
    const id = this.deletingId();
    if (!id) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.companyService
      .deleteCompany(id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.toast.success('Success', 'Company deleted');
          const willBeEmpty = this.apiItems().length === 1 && this.currentPage() > 1;
          if (willBeEmpty) this.currentPage.set(this.currentPage() - 1);

          if (opts?.refresh !== false) this.refresh();
          opts?.closeOnSuccess?.();

          this.deletingId.set(null);
        },
        error: (e) => {
          const msg = e?.error?.message || e?.message || 'Failed to delete company';
          this.deleteError.set(msg);
          this.toast.error('Error', msg);
        },
      });
  }

  deleteMany(ids: string[], opts?: { closeOnSuccess?: () => void; refresh?: boolean }) {
    if (!ids.length) return;

    this.deleting.set(true);
    this.deleteError.set(null);
    this.deletingId.set(null);

    const requests = ids.map((id) =>
      this.companyService.deleteCompany(id).pipe(
        catchError((error) => of({ error })),
      ),
    );

    forkJoin(requests)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: (results) => {
          const failed = results.filter((result: any) => result?.error);
          if (failed.length) {
            const msg = 'Failed to delete some companies';
            this.deleteError.set(msg);
            this.toast.error('Error', msg);
            return;
          }

          this.toast.success('Success', 'Companies deleted');

          const willBeEmpty = this.apiItems().length <= ids.length && this.currentPage() > 1;
          if (willBeEmpty) this.currentPage.set(this.currentPage() - 1);

          if (opts?.refresh !== false) this.refresh();
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          const msg = e?.error?.message || e?.message || 'Failed to delete companies';
          this.deleteError.set(msg);
          this.toast.error('Error', msg);
        },
      });
  }

  openCreate() {
    this.dialogMode.set('create');
    this.editingId.set(null);
  }

  openEdit(row: { id: string }) {
    this.dialogMode.set('edit');
    this.editingId.set(row.id);
  }

  openDelete(row: { id: string }) {
    this.deletingId.set(row.id);
    this.deleteError.set(null);
  }
}
