import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { UiTableComponent } from '../../../../../../shared/table/table';

import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';

@Component({
  selector: 'management-users-roles',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    FormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    UiTableComponent,
    ContextMenuModule,
  ],
  templateUrl: './users-roles.html',
})
export class UsersRolesPage implements OnInit {
  items: any[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Edit', icon: 'pi pi-pencil' },
      { label: 'Delete', icon: 'pi pi-trash' },
    ];
  }
  value2: string = '';
  date: Date | undefined;

  dates: Date[] | undefined;

  products = [
    {
      company: 'Acme Corp',
      plan: 'Enterprise',
      status: 'Active',
      users: 120,
      created_at: '2023-01-01',
      photo: '/favicon.ico',
      statusVariant: 'success',
      planVariant: 'success',
      planIcon: 'pi pi-bolt',
      statusIcon: 'pi pi-check',
    },
    {
      company: 'Globex',
      plan: 'Pro',
      status: 'Pending',
      users: 48,
      created_at: '2023-02-10',
      photo: '/favicon.ico',
      statusVariant: 'warning',
      planVariant: 'info',
      planIcon: 'pi pi-box',
      statusIcon: 'pi pi-clock',
    },
    {
      company: 'Initech',
      plan: 'Starter',
      status: 'Inactive',
      users: 8,
      created_at: '2023-03-05',
      photo: '/favicon.ico',
      statusVariant: 'danger',
      planVariant: 'warning',
      planIcon: 'pi pi-star',
      statusIcon: 'pi pi-times',
    },
  ];

  tableColumns = [
    { field: 'company', header: 'Company' },
    { field: 'plan', header: 'Plan' },
    { field: 'status', header: 'Status' },
    { field: 'users', header: 'Users' },
    { field: 'created_at', header: 'Created At' },
  ];
  totalRecords = 120;
  rowsPerPageOptions = [10, 20, 30];

  chipFields = ['plan', 'status'];
  chipVariantFieldMap = { plan: 'planVariant', status: 'statusVariant' };
  chipIconFieldMap = { plan: 'planIcon', status: 'statusIcon' };

  edit(row: any) {
    console.log('Edit', row);
  }

  remove(row: any) {
    console.log('Remove', row);
  }
}
