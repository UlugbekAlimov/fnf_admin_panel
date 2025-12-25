import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompaniesTable } from './companies-table';

import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'management-companies',
  standalone: true,
  imports: [Button, InputTextModule, FormsModule, Select, DatePickerModule, ButtonModule, CompaniesTable],
  templateUrl: './companies.html',
  styleUrls: ['./companies.css'],
})
export class ManagementCompanies {
  value2: string = '';
  date: Date | undefined;

  dates: Date[] | undefined;
}
