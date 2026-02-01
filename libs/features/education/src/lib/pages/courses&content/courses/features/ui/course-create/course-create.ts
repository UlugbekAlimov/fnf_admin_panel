import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

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
  private dialogVisible = false;

  @Input() set visible(value: boolean) {
    this.dialogVisible = value;
    if (value && !this.editingCourse) {
      this.reset();
    }
  }
  get visible() {
    return this.dialogVisible;
  }
  @Input() editingCourse: any | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() create = new EventEmitter<any>();
  @Output() update = new EventEmitter<{ id: number; data: any }>();

  title = '';
  slug = '';
  level: { name: string } | null = null;
  language: { name: string } | null = null;
  status: { name: string } | null = null;
  students: number | null = null;
  description = '';

  levels = [{ name: 'Beginner' }, { name: 'Intermediate' }, { name: 'Advanced' }];
  languages = [{ name: 'English' }, { name: 'Spanish' }, { name: 'German' }];
  statuses = [{ name: 'Published' }, { name: 'Draft' }, { name: 'Archived' }];

  get isEditMode(): boolean {
    return !!this.editingCourse;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editingCourse']) {
      if (this.editingCourse) {
        this.title = this.editingCourse.name ?? '';
        this.slug = this.editingCourse.slug ?? '';
        this.level =
          this.levels.find((item) => item.name === this.editingCourse.level) ?? this.levels[0];
        this.language =
          this.languages.find((item) => item.name === this.editingCourse.language) ??
          this.languages[0];
        this.status =
          this.statuses.find((item) => item.name === this.editingCourse.status) ?? this.statuses[0];
        this.students =
          typeof this.editingCourse.students === 'number' ? this.editingCourse.students : 0;
        this.description = this.editingCourse.description ?? '';
      } else {
        this.reset();
      }
    }
  }

  close() {
    this.reset();
    this.visibleChange.emit(false);
  }

  handleVisibleChange(value: boolean) {
    if (!value) {
      this.reset();
      this.visibleChange.emit(false);
    }
  }

  submit() {
    const name = this.title.trim();
    const slug = this.slug.trim();
    if (!name || !slug) {
      return;
    }

    const payload = {
      name,
      slug,
      level: this.level?.name ?? 'Beginner',
      language: this.language?.name ?? 'English',
      status: this.status?.name ?? 'Draft',
      students: typeof this.students === 'number' ? this.students : 0,
      description: this.description.trim()
    };

    if (this.editingCourse) {
      this.update.emit({ id: this.editingCourse.id, data: payload });
    } else {
      this.create.emit(payload);
    }
    this.reset();
    this.visibleChange.emit(false);
  }

  private reset() {
    this.title = '';
    this.slug = '';
    this.level = this.levels[0];
    this.language = this.languages[0];
    this.status = this.statuses[0];
    this.students = null;
    this.description = '';
  }
}
