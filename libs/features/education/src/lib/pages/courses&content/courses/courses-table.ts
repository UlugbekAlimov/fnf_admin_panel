import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Dialog } from 'primeng/dialog';
import { UiTableComponent } from '../../../../../../../shared/table/table';
import { CourseCreate } from './features/ui/course-create/course-create';
import { CourseStore } from './model/course.store';

@Component({
  selector: 'education-courses-table',
  templateUrl: './courses-table.html',
  standalone: true,
  imports: [
    Button,
    FormsModule,
    DatePickerModule,
    InputTextModule,
    Select,
    Dialog,
    UiTableComponent,
    CourseCreate,
  ],
})
export class CoursesTable {
  showDialog = false;
  searchTerm = '';
  dates: Date[] | undefined;

  plans = [{ name: 'Enterprise' }, { name: 'Pro Team' }, { name: 'Startup' }];
  cities = [{ name: 'USA' }, { name: 'Germany' }, { name: 'Canada' }];
  selectedPlan: { name: string } | null = null;
  selectedCity: { name: string } | null = null;

  showDeleteDialog = false;
  showDetailDrawer = false;
  selectedCompany: any | null = null;
  editingCourse: any | null = null;
  items: any[] | undefined;

  ngOnInit() {}

  date: Date | undefined;

  tableColumns = [
    { field: 'name', header: 'Name' },
    { field: 'level', header: 'Level' },
    { field: 'language', header: 'Language' },
    { field: 'students', header: 'Students' },
    { field: 'status', header: 'Status' },
    { field: 'createdAt', header: 'Created At' },
  ];
  rowsPerPageOptions = [10, 20, 30];

  chipFields = ['status'];
  chipVariantFieldMap = { status: 'statusVariant' };

  get products() {
    return this.store.rows();
  }

  get totalRecords() {
    return this.products.length;
  }

  openCreate() {
    this.editingCourse = null;
    this.showDialog = true;
  }

  edit(row: any) {
    this.editingCourse = row;
    this.showDialog = true;
  }

  remove(row: any) {
    this.selectedCompany = row;
    this.showDeleteDialog = true;
  }

  detail(row: any) {
    this.selectedCompany = row;
    this.showDetailDrawer = true;
  }

  createCourse(payload: any) {
    this.store.createCourse(payload, { closeOnSuccess: () => (this.showDialog = false) });
  }

  updateCourse(payload: { id: number; data: any }) {
    this.store.updateCourse(payload.id, payload.data, {
      closeOnSuccess: () => {
        this.showDialog = false;
        this.editingCourse = null;
      }
    });
  }

  confirmDelete() {
    if (!this.selectedCompany?.id) return;
    this.store.deleteCourse(this.selectedCompany.id);
    this.showDeleteDialog = false;
    this.selectedCompany = null;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
    this.selectedCompany = null;
  }

  constructor(public store: CourseStore) {
    this.store.loadCourses();
  }
}
