import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { ReactiveFormsModule } from '@angular/forms';

import { CompanyService } from '../core/company.service';
import { CompanyCreate, AutoCompleteCompleteEvent } from '../core/company.model';
import { ToastService } from '../../../../../../../shared/toast/toast.service';

@Component({
  selector: 'companies-create',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    

    Button,
    DatePickerModule,
    ButtonModule,
    Dialog,
    ColorPickerModule,
    AutoCompleteModule,
  ],
  templateUrl: './company-create.html',
})
export class CompaniesCreate implements OnInit {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  name = '';
  slug = '';
  country: { name: string; code: string } | null = null;
  timezone = '';

  countries: { name: string; code: string }[] = [];
  filteredCountries: { name: string; code: string }[] = [];

  statuses = [{ name: 'Active' }, { name: 'Inactive' }];

  constructor(
    private http: HttpClient,
    private companyService: CompanyService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.http
      .get<{ name: string; code: string }[]>('/countries/countries.json')
      .subscribe({
        next: (data) => {
          this.countries = data ?? [];
          this.filteredCountries = this.countries;
        },
        error: () => {
          this.countries = [];
          this.filteredCountries = [];
        },
      });
  }

  close() {
    this.resetForm();
    this.visibleChange.emit(false);
  }

  search(event: AutoCompleteCompleteEvent) {
    const query = (event.query ?? '').toLowerCase();
    if (!query) {
      this.filteredCountries = this.countries;
      return;
    }
    this.filteredCountries = this.countries.filter((country) =>
      country.name.toLowerCase().includes(query),
    );
  }

  submit() {
    const payload: CompanyCreate = {
      name: this.name.trim(),
      slug: this.slug.trim(),
      timezone: this.timezone.trim(),
      country: this.country?.name ?? '',
    };

    if (!payload.name || !payload.slug) {
      return;
    }

    this.companyService.createCompany(payload).subscribe({
      next: () => {
        this.close();
        this.showSuccess();
      },
      error: (err) => {
        this.toast.error('Error', err.message || 'Failed to create company');
      },
    });
  }

  private resetForm() {
    this.name = '';
    this.slug = '';
    this.country = null;
    this.timezone = '';
  }

  showSuccess() {
    this.toast.success('Success', 'Company created');
  }

  showError() {
    this.toast.error('Error', 'Request failed');
  }
}
