import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'user-detail',
  standalone: true,
  imports: [CommonModule, Button, Drawer],
  templateUrl: './user-detail.html',
})
export class UserDetail {
  @Input() set visible(value: boolean) {
    this.drawerVisible = value;
  }
  get visible() {
    return this.drawerVisible;
  }
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() user: any | null = null;

  drawerVisible = false;

  close() {
    this.onVisibleChange(false);
  }

  onVisibleChange(value: boolean) {
    this.drawerVisible = value;
    this.visibleChange.emit(value);
  }
}
