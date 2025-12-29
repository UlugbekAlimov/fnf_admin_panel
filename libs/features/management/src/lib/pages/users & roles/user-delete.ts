import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'user-delete',
  standalone: true,
  imports: [Button, Dialog],
  templateUrl: './user-delete.html',
})
export class UserDelete {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() user: any | null = null;
  @Output() confirm = new EventEmitter<any>();

  close() {
    this.visibleChange.emit(false);
  }

  submit() {
    if (this.user) {
      this.confirm.emit(this.user);
    }
    this.close();
  }
}
