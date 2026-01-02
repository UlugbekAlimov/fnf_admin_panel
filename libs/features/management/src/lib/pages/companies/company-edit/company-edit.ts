import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

@Component({
  selector: 'company-edit',
  standalone: true,
  imports: [FormsModule, Button, Dialog, InputTextModule, Select],
  templateUrl: './company-edit.html',
})
export class CompanyEdit {
  private currentCompany: any | null = null;

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<any>();

  @Input() set company(value: any | null) {
    this.currentCompany = value;
    this.editName = value?.name ?? '';
    this.editCountry = value?.country ? { name: value.country } : null;
    this.editStatus = value?.status ? { name: value.status } : null;
    this.editLabel = value?.label_name ?? '';
  }
  get company() {
    return this.currentCompany;
  }

  editName = '';
  editLabel = '';
  editCountry: { name: string } | null = null;
  editStatus: { name: string } | null = null;

  countries = [{ name: 'USA' }, { name: 'Germany' }, { name: 'Canada' }];
  statuses = [{ name: 'Active' }, { name: 'Inactive' }];

  close() {
    this.visibleChange.emit(false);
  }

  submit() {
    if (!this.currentCompany) {
      this.close();
      return;
    }

    const statusName = this.editStatus?.name ?? this.currentCompany.status;
    const updated = {
      ...this.currentCompany,
      name: this.editName.trim() || this.currentCompany.name,
      label_name: this.editLabel.trim() || this.currentCompany.label_name,
      country: this.editCountry?.name ?? this.currentCompany.country,
      status: statusName,
      statusVariant: statusName === 'Active' ? 'success' : 'danger',
    };

    this.save.emit(updated);
    this.close();
  }
}
