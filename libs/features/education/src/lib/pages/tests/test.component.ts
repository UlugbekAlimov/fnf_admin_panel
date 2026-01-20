import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { UiTableComponent } from '../../../../../../shared/table/table';
import { QuestionCreate } from './features/ui/question-create/question-create';
import { TestCreate, type TestCreatePayload } from './features/ui/test-create/test-create';

@Component({
  selector: 'education-tests',
  standalone: true,
  imports: [Button, UiTableComponent, TestCreate, QuestionCreate],
  templateUrl: './test.component.html',
})
export class TestComponent {
  showDialog = false;
  showQuestionDialog = false;

  tests = [
    {
      id: 1,
      name: 'Midterm Assessment',
      course: 'UX UI Design Fundamentals',
      questions: 25,
      duration: '45 min',
      status: 'Active',
      statusVariant: 'success',
      createdAt: '2026-01-10',
    },
    {
      id: 2,
      name: 'HTML Basics Quiz',
      course: 'Frontend Essentials',
      questions: 15,
      duration: '20 min',
      status: 'Draft',
      statusVariant: 'warning',
      createdAt: '2026-01-05',
    },
  ];

  tableColumns = [
    { field: 'name', header: 'Test Name' },
    { field: 'course', header: 'Course' },
    { field: 'questions', header: 'Questions' },
    { field: 'duration', header: 'Duration' },
    { field: 'status', header: 'Status' },
    { field: 'createdAt', header: 'Created At' },
  ];

  chipFields = ['status'];
  chipVariantFieldMap = { status: 'statusVariant' };

  openDialog() {
    this.showDialog = true;
  }

  openQuestionDialog() {
    this.showQuestionDialog = true;
  }

  addTest(payload: TestCreatePayload) {
    this.tests = [
      ...this.tests,
      {
        id: this.tests.length + 1,
        name: payload.name,
        course: payload.course,
        questions: payload.questions,
        duration: payload.duration,
        status: 'Draft',
        statusVariant: 'warning',
        createdAt: new Date().toISOString().slice(0, 10),
      },
    ];
  }
}
