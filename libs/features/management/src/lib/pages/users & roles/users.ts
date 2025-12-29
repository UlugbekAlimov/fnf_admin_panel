import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { UiTableComponent } from '../../../../../../shared/table/table';
import { UserDelete } from './user-delete';
import { UserDetail } from './user-detail';
import { UserEdit } from './user-edit';

import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'management-users',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    FormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    UiTableComponent,
    UserEdit,
    UserDelete,
    UserDetail,
  ],
  templateUrl: './users.html',
})
export class UsersPage {
  value2: string = '';
  date: Date | undefined;

  dates: Date[] | undefined;

  showEditDialog = false;
  showDeleteDialog = false;
  showDetailDrawer = false;
  selectedUser: any | null = null;

  products = [
    {
      id: 1,
      company: 'Acme Corp',
      name: 'Rachel Green',
      email: 'rachel@acme.com',
      role: 'Manager',
      lastActive: 'Today, 10:24',
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
      id: 2,
      company: 'Globex',
      name: 'David Miller',
      email: 'david@globex.com',
      role: 'Owner',
      lastActive: 'Yesterday, 18:02',
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
      id: 3,
      company: 'Initech',
      name: 'Lena Watts',
      email: 'lena@initech.com',
      role: 'Viewer',
      lastActive: 'Dec 21, 09:10',
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

  detail(row: any) {
    this.selectedUser = row;
    this.showDetailDrawer = true;
  }

  edit(row: any) {
    this.selectedUser = row;
    this.showEditDialog = true;
  }

  remove(row: any) {
    this.selectedUser = row;
    this.showDeleteDialog = true;
  }

  updateUser(updated: any) {
    this.products = this.products.map((product) =>
      product.id === updated.id ? { ...product, ...updated } : product
    );
  }

  confirmDelete(user: any) {
    this.products = this.products.filter((product) => product.id !== user.id);
  }
}
