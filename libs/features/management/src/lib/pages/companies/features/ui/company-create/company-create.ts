import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Select } from 'primeng/select';

import { ReactiveFormsModule } from '@angular/forms';

import { CompanyCreate, AutoCompleteCompleteEvent, CompanyUpdate } from '../../model/company.model';
import { CompaniesStore } from '../../model/company.store';
import { CommonModule } from '@angular/common';
import { StatusEnum } from '@fnf_admin/core';

@Component({
  selector: 'companies-create',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    Select,

    Button,
    DatePickerModule,
    ButtonModule,
    Dialog,
    ColorPickerModule,
    AutoCompleteModule,
    CommonModule,
  ],
  templateUrl: './company-create.html',
})
export class CompaniesCreate implements OnInit, OnChanges {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() editingCompany: any | null = null;

  readonly store = inject(CompaniesStore);
  private http = inject(HttpClient);

  name = '';
  slug = '';
  country: { name: string; code: string } | null = null;
  timezone = '';

  legal_name = '';
  defaultLocale: { name: string; code: string } | null = null;
  status = '';

  countries: { name: string; code: string }[] = [];
  filteredCountries: { name: string; code: string }[] = [];
  languages: { name: string; code: string }[] = [];
  filteredLanguages: { name: string; code: string }[] = [];
  readonly statusOptions = Object.values(StatusEnum);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editingCompany']) {
      if (this.editingCompany?.id) {
        this.store.openEdit({ id: this.editingCompany.id });
      } else {
        this.store.openCreate();
      }

      this.fillFormFromEditingCompany();
    }
  }

  ngOnInit() {
    this.http.get<{ name: string; code: string }[]>('/countries/countries.json').subscribe({
      next: (data) => {
        this.countries = data ?? [];
        this.filteredCountries = this.countries;
        this.fillFormFromEditingCompany();
      },
      error: () => {
        this.countries = [];
        this.filteredCountries = [];
      },
    });

    this.http.get<{ name: string; code: string }[]>('/languages/languages.json').subscribe({
      next: (data) => {
        this.languages = data ?? [];
        this.filteredLanguages = this.languages;
        this.fillFormFromEditingCompany();
      },
      error: () => {
        this.languages = [];
        this.filteredLanguages = [];
      },
    });
  }

  private fillFormFromEditingCompany() {
    const c = this.editingCompany;
    if (!c) return;

    this.name = c.name ?? '';
    this.slug = c.slug ?? '';
    this.timezone = c.timezone ?? '';
    this.legal_name = c.legal_name ?? '';
    this.status = c.status ?? '';

    const match = this.countries.find((x) => x.name === c.country);
    this.country = match ?? (c.country ? { name: c.country, code: '' } : null);

    const localeRaw = (c.default_locale ?? '').trim();
    if (!localeRaw) {
      this.defaultLocale = null;
      return;
    }

    const localeLower = localeRaw.toLowerCase();
    const localeMatch =
      this.languages.find(
        (x) => x.code.toLowerCase() === localeLower || x.name.toLowerCase() === localeLower,
      ) ?? this.languages.find((x) => new RegExp(`\\b${x.code}\\b`, 'i').test(localeRaw));

    this.defaultLocale = localeMatch ?? { name: localeRaw, code: '' };
  }

  close() {
    this.resetForm();
    this.visibleChange.emit(false);
  }

  search(event: AutoCompleteCompleteEvent) {
    const query = (event.query ?? '').toLowerCase();
    this.filteredCountries = !query
      ? this.countries
      : this.countries.filter((c) => c.name.toLowerCase().includes(query));
  }

  searchLanguage(event: AutoCompleteCompleteEvent) {
    const query = (event.query ?? '').toLowerCase();
    this.filteredLanguages = !query
      ? this.languages
      : this.languages.filter((l) => l.name.toLowerCase().includes(query));
  }

  submit() {
    const isEdit = !!this.editingCompany;

    if (isEdit) {
      const defaultLocaleValue = this.defaultLocale
        ? [this.defaultLocale.name?.trim(), this.defaultLocale.code?.trim()]
            .filter(Boolean)
            .join(' ')
        : '';
      const dto: CompanyUpdate = {
        name: this.name.trim(),
        legal_name: this.legal_name.trim(),
        timezone: this.timezone.trim(),
        default_locale: defaultLocaleValue,
        status: this.status.trim(),
        country: this.country?.name ?? '',
      };
      if (!dto.name) return;

      this.store.update(dto, { closeOnSuccess: () => this.close(), refresh: true });
      return;
    }

    const dto: CompanyCreate = {
      name: this.name.trim(),
      slug: this.slug.trim(),
      timezone: this.timezone.trim(),
      country: this.country?.name ?? '',
    };
    if (!dto.name || !dto.slug) return;

    this.store.create(dto, { closeOnSuccess: () => this.close(), refresh: true });
  }

  private resetForm() {
    this.name = '';
    this.slug = '';
    this.timezone = '';
    this.country = null;

    this.legal_name = '';
    this.defaultLocale = null;
    this.status = '';
  }
}
