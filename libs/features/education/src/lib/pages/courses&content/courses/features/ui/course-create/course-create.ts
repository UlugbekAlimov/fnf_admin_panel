import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'courses-table',
  imports: [Dialog, Button, Select, InputText, TextareaModule, FormsModule],
  templateUrl: './course-create.html',
  standalone: true,
})
export class CourseCreate {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  value!: string;

  close() {
    this.visibleChange.emit(false);
  }
}
