import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'companies-create',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    FormsModule,
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
  legalName = '';
  country: { name: string } | null = null;
  timezone = '';
  locale = '';
  logoUrl = '';
  primaryColor = '#008B94';
  secondaryColor = '#0984E3';
  status: { name: string } | null = null;

  countries = [
    { name: 'USA' },
    { name: 'Germany' },
    { name: 'France' },
    { name: 'Canada' },
  ];

  statuses = [{ name: 'Active' }, { name: 'Inactive' }];

  close() {
    this.visibleChange.emit(false);
  }
}
