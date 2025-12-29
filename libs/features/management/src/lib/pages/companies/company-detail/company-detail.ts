import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'company-detail',
  standalone: true,
  imports: [CommonModule, Button, Drawer],
  templateUrl: './company-detail.html',
})
export class CompanyDetail {
  @Input() set visible(value: boolean) {
    this.drawerVisible = value;
  }
  get visible() {
    return this.drawerVisible;
  }
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() company: any | null = null;

  drawerVisible = false;

  close() {
    this.onVisibleChange(false);
  }

  onVisibleChange(value: boolean) {
    this.drawerVisible = value;
    this.visibleChange.emit(value);
  }
}
