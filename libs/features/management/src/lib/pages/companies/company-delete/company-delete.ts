import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'company-delete',
  standalone: true,
  imports: [Button, Dialog],
  templateUrl: './company-delete.html',
})
export class CompanyDelete {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() company: any | null = null;
  @Output() confirm = new EventEmitter<any>();

  close() {
    this.visibleChange.emit(false);
  }

  submit() {
    if (this.company) {
      this.confirm.emit(this.company);
    }
    this.close();
  }
}
