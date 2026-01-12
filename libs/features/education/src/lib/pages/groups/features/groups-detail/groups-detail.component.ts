import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiTableComponent } from 'libs/shared/table/table';

type GroupDetail = {
  id: number;
  name: string;
  subject: string;
  teacher: string;
  sessionsPerWeek: number;
  status: string;
  students: Array<{
    id: number;
    name: string;
    email: string;
    status: string;
    statusVariant: 'success' | 'warning' | 'danger' | 'info';
  }>;
};

@Component({
  selector: 'education-groups-detail',
  standalone: true,
  imports: [CommonModule, UiTableComponent],
  templateUrl: './groups-detail.component.html',
})
export class GroupsDetailComponent {
  groupId = 0;
  group: GroupDetail | null = null;

  tableColumns = [
    { field: 'name', header: 'Student' },
    { field: 'email', header: 'Email' },
    { field: 'status', header: 'Status' },
  ];

  chipFields = ['status'];
  chipVariantFieldMap = { status: 'statusVariant' };

  constructor(private route: ActivatedRoute) {
    this.groupId = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    this.group = this.groups.find((item) => item.id === this.groupId) ?? null;
  }

  private groups: GroupDetail[] = [
    {
      id: 1,
      name: 'Northwind Logistics',
      subject: 'Business English',
      teacher: 'Amina Yussupova',
      sessionsPerWeek: 3,
      status: 'Active',
      students: [
        {
          id: 101,
          name: 'Erik Hansen',
          email: 'erik.hansen@northwind.io',
          status: 'Active',
          statusVariant: 'success',
        },
        {
          id: 102,
          name: 'Aruzhan S.',
          email: 'aruzhan.s@northwind.io',
          status: 'Active',
          statusVariant: 'success',
        },
        {
          id: 103,
          name: 'Maksim K.',
          email: 'maksim.k@northwind.io',
          status: 'Paused',
          statusVariant: 'warning',
        },
      ],
    },
    {
      id: 2,
      name: 'Blue Harbor Foods',
      subject: 'Food Safety Basics',
      teacher: 'Dana Kolesnik',
      sessionsPerWeek: 2,
      status: 'Pending',
      students: [
        {
          id: 201,
          name: 'Nikita B.',
          email: 'nikita.b@blueharbor.io',
          status: 'Invited',
          statusVariant: 'info',
        },
        {
          id: 202,
          name: 'Zarina A.',
          email: 'zarina.a@blueharbor.io',
          status: 'Invited',
          statusVariant: 'info',
        },
      ],
    },
    {
      id: 3,
      name: 'Scam Corp',
      subject: 'Compliance 101',
      teacher: 'Timur N.',
      sessionsPerWeek: 1,
      status: 'Blocked',
      students: [
        {
          id: 301,
          name: 'Artem P.',
          email: 'artem.p@scam.io',
          status: 'Blocked',
          statusVariant: 'danger',
        },
      ],
    },
  ];
}
