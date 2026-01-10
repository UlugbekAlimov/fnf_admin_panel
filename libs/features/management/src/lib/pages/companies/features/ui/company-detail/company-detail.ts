import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Drawer } from 'primeng/drawer';

import { CompanyService } from '../../data-access/company.service';
import { CompanyApiItem } from '../../model/company.model';

@Component({
  selector: 'company-detail',
  standalone: true,
  imports: [CommonModule, Drawer],
  templateUrl: './company-detail.html',
})
export class CompanyDetail implements OnChanges {
  @ViewChild(Drawer) drawer?: Drawer;

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

    this.company = null;
    if (!value) {
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
        this.company = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.drawerVisible) {
      return;
    }
    const container = this.drawer?.container;
    const target = event.target as Node | null;
    if (!container || !target) {
      return;
    }
    if (!container.contains(target)) {
      this.onVisibleChange(false);
    }
  }
}
