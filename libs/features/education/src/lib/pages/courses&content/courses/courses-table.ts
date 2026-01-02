import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { UiTableComponent } from '../../../../../../../shared/table/table';
import { CourseCreate } from './course-create/course-create';

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

  showEditDialog = false;
  showDeleteDialog = false;
  showDetailDrawer = false;
  selectedCompany: any | null = null;
  items: any[] | undefined;

  ngOnInit() {}

  date: Date | undefined;

  products = [
    {
      id: 1,
      name: 'UX UI Design Fundamentals',
      slug: 'ux ui design-fundamentals',
      level: 'Beginner',
      language: 'English',
      students: 1200,
      status: 'Published',
      createdAt: '2023-01-12',
      logo: '/favicon.ico',

      statusVariant: 'success',
    },
  ];

  tableColumns = [
    { field: 'name', header: 'Name' },
    { field: 'level', header: 'Level' },
    { field: 'language', header: 'Language' },
    { field: 'students', header: 'Students' },
    { field: 'status', header: 'Status' },
    { field: 'createdAt', header: 'Created At' },
  ];
  totalRecords = 120;
  rowsPerPageOptions = [10, 20, 30];

  chipFields = ['status'];
  chipVariantFieldMap = { status: 'statusVariant' };

  edit(row: any) {
    this.selectedCompany = row;
    this.showEditDialog = true;
  }

  remove(row: any) {
    this.selectedCompany = row;
    this.showDeleteDialog = true;
  }

  detail(row: any) {
    this.selectedCompany = row;
    this.showDetailDrawer = true;
  }
}
