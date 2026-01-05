import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { Button } from 'primeng/button';

import { CompanyService } from '../core/company.service';
import { CompanyApiItem } from '../core/company.model';

@Component({
  selector: 'company-detail',
  standalone: true,
  imports: [CommonModule, Drawer, Button],
  templateUrl: './company-detail.html',
})
export class CompanyDetail implements OnChanges {
  @Input() companyId: CompanyApiItem['id'] | null = null;

  @Input() set visible(value: boolean) {
    this.drawerVisible = value;
    if (value) this.load();
  }
  get visible() {
    return this.drawerVisible;
  }

  @Output() visibleChange = new EventEmitter<boolean>();

  drawerVisible = false;

  company: CompanyApiItem | null = null;
  loading = false;
  error = false;

  constructor(private companyService: CompanyService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyId'] && this.drawerVisible) {
      this.load();
    }
  }

  onVisibleChange(value: boolean) {
    this.drawerVisible = value;
    this.visibleChange.emit(value);

    if (!value) {
      this.company = null;
      this.loading = false;
      this.error = false;
    }
  }

  private load() {
    if (!this.companyId) {
      this.company = null;
      return;
    }

    this.loading = true;
    this.error = false;
    this.company = null;

    this.companyService.getCompanyById(this.companyId).subscribe({
      next: (res) => {
        this.company = res; // тут уже минимум полей по твоему интерфейсу
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }
}
