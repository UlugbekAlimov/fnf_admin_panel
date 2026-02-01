import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { UiTableComponent } from '../../../../../../shared/table/table';
import {
  QuestionCreate,
  type QuestionCreatePayload,
} from './features/ui/question-create/question-create';
import { TestCreate, type TestCreatePayload } from './features/ui/test-create/test-create';
import { QuestionStore } from './model/question.store';
import { TestStore } from './model/test.store';

@Component({
  selector: 'education-tests',
  standalone: true,
  imports: [Button, UiTableComponent, TestCreate, QuestionCreate, Select, FormsModule],
  templateUrl: './test.component.html',
})
export class TestComponent {
  showDialog = false;
  showQuestionDialog = false;

  viewOptions = [
    { name: 'Questions', value: 'tests' },
    { name: 'Tests', value: 'questions' },
  ];
  selectedView = this.viewOptions[0];

  private readonly testColumns = [
    { field: 'name', header: 'Name' },
    { field: 'course', header: 'Course' },
    { field: 'questions', header: 'Questions' },
    { field: 'duration', header: 'Duration' },
    { field: 'status', header: 'Status' },
    { field: 'createdAt', header: 'Created At' },
  ];

  private readonly questionColumns = [
    { field: 'text', header: 'Question' },
    { field: 'testName', header: 'Test' },
    { field: 'type', header: 'Type' },
    { field: 'answers', header: 'Answers' },
    { field: 'status', header: 'Status' },
    { field: 'createdAt', header: 'Created At' },
  ];

  chipFields = ['status'];
  chipVariantFieldMap = { status: 'statusVariant' };

  get isQuestionsView() {
    return this.selectedView?.value === 'questions';
  }

  get tests() {
    return this.store.rows();
  }

  get questions() {
    return this.questionStore.rows();
  }

  get tableColumns() {
    return this.isQuestionsView ? this.questionColumns : this.testColumns;
  }

  get tableRows() {
    return this.isQuestionsView ? this.questions : this.tests;
  }

  get totalRecords() {
    return this.tableRows.length;
  }

  openDialog() {
    this.selectedView = this.viewOptions[1];
    this.showDialog = true;
  }

  openQuestionDialog() {
    this.selectedView = this.viewOptions[0];
    this.showQuestionDialog = true;
  }

  addTest(payload: TestCreatePayload) {
    this.selectedView = this.viewOptions[0];
    this.store.createTest(
      {
        name: payload.name,
        course: payload.course,
        questions: payload.questions,
        duration: payload.duration,
        status: 'Draft',
      },
      {
        closeOnSuccess: () => (this.showQuestionDialog = false),
      },
    );
  }

  addQuestion(payload: QuestionCreatePayload) {
    this.selectedView = this.viewOptions[1];
    this.questionStore.createQuestion(
      {
        testName: payload.testName,
        text: payload.text,
        type: payload.type,
        answers: payload.answers,
        status: payload.status,
      },
      {
        closeOnSuccess: () => (this.showDialog = false),
      },
    );
  }

  constructor(
    public store: TestStore,
    public questionStore: QuestionStore,
  ) {
    this.store.loadTests();
    this.questionStore.loadQuestions();
  }
}
