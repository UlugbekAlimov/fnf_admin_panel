import { Routes } from '@angular/router';
import { CoursesTable } from './courses&content/courses/courses-table';
import { EducationContent } from './courses&content/content/content';

export const educationRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'courses', component: CoursesTable, data: { breadcrumb: 'Courses' } },


  { path: 'content', component: EducationContent, data: { breadcrumb: 'Content' } }
];
