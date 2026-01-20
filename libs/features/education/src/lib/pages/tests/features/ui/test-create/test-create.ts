import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

export type TestCreatePayload = {
  name: string;
  course: string;
  questions: number;
  duration: string;
};

@Component({
  selector: 'education-test-create',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, Dialog, InputTextModule],
  templateUrl: './test-create.html',
})
export class TestCreate {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() create = new EventEmitter<TestCreatePayload>();

  name = '';
  course = '';
  questions: number | null = null;
  duration = '';

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  submit() {
    const trimmedName = this.name.trim();
    const trimmedCourse = this.course.trim();
    if (!trimmedName || !trimmedCourse) return;

    this.create.emit({
      name: trimmedName,
      course: trimmedCourse,
      questions: this.questions ?? 0,
      duration: this.duration.trim() || 'N/A',
    });

    this.name = '';
    this.course = '';
    this.questions = null;
    this.duration = '';
    this.close();
  }
}
