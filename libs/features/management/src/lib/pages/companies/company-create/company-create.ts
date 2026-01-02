import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';

import { ReactiveFormsModule, } from '@angular/forms';

import { CompanyService } from '../core/company.service';
import { CompanyCreate } from '../core/company.model';
import { ToastService } from '../../../../../../../shared/toast/toast.service';

@Component({
  selector: 'companies-create',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,

    Button,
    Select,
    DatePickerModule,
    ButtonModule,
    Dialog,
    ColorPickerModule,

  ],
  templateUrl: './company-create.html',
})
export class CompaniesCreate {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  name = '';
  slug = '';
  country: { name: string } | null = null;
  timezone = '';

  countries = [{ name: 'USA' }, { name: 'Germany' }, { name: 'France' }, { name: 'Canada' }];

  statuses = [{ name: 'Active' }, { name: 'Inactive' }];

  constructor(
    private companyService: CompanyService,
    private toast: ToastService,
  ) {}

  close() {
    this.resetForm();
    this.visibleChange.emit(false);
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
