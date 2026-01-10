import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'company-delete',
  standalone: true,
  imports: [CommonModule, Button, Dialog],
  templateUrl: './company-delete.html',
})
export class CompanyDelete {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() company: any | null = null;
  @Input() companies: any[] | null = null;
  @Output() confirm = new EventEmitter<any>();

  close() {
    this.visibleChange.emit(false);
  }

  submit() {
    const items = this.companies?.length ? this.companies : this.company ? [this.company] : [];
    if (items.length) {
      this.confirm.emit(items.length === 1 ? items[0] : items);
    }
    this.close();
  }
}
