import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { CoursesTable } from './courses&content/courses/courses-table';
import { EducationContent } from './courses&content/content/content';
import { GroupsDetailComponent } from './groups/features/groups-detail/groups-detail.component';
import { GroupsComponents } from './groups/features/groups.component';
import { TestComponent } from './tests/test.component';

export const educationRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'courses', component: CoursesTable, data: { breadcrumb: 'Courses' } },
  { path: 'content', component: EducationContent, data: { breadcrumb: 'Content' } },
  {
    path: 'groups',
    data: { breadcrumb: 'Groups' },
    children: [
      { path: '', component: GroupsComponents },
      {
        path: ':id',
        component: GroupsDetailComponent,
        data: {
          breadcrumb: (route: ActivatedRouteSnapshot) => {
            const id = Number(route.paramMap.get('id') ?? 0);
            const name = {
              1: 'Northwind Logistics',
              2: 'Blue Harbor Foods',
              3: 'Scam Corp',
            }[id];
            return name ?? 'Group';
          },
        },
      },
    ],
  },
  { path: 'tests', component: TestComponent },
];
