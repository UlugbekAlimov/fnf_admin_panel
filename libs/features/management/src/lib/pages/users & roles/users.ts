import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { UiTableComponent } from '../../../../../../shared/table/table';
import { UserDelete } from './user-delete/user-delete';
import { UserDetail } from './user-detail/user-detail';
import { UserEdit } from './user-edit/user-edit';

import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { UserStore } from './model/user.store';

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
  showCreateDialog = false;
  selectedUser: any | null = null;

  tableColumns = [
    { field: 'company', header: 'Company' },
    { field: 'plan', header: 'Plan' },
    { field: 'status', header: 'Status' },
    { field: 'users', header: 'Users' },
    { field: 'created_at', header: 'Created At' },
  ];
  rowsPerPageOptions = [10, 20, 30];

  chipFields = ['plan', 'status'];
  chipVariantFieldMap = { plan: 'planVariant', status: 'statusVariant' };
  chipIconFieldMap = { plan: 'planIcon', status: 'statusIcon' };

  get products() {
    return this.store.rows();
  }

  get totalRecords() {
    return this.products.length;
  }

  detail(row: any) {
    this.selectedUser = row;
    this.showDetailDrawer = true;
  }

  openCreate() {
    this.selectedUser = null;
    this.showCreateDialog = true;
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
    if (!updated?.id) return;
    this.store.updateUser(updated.id, updated);
  }

  createUser(payload: any) {
    this.store.createUser(payload);
  }

  confirmDelete(user: any) {
    if (!user?.id) return;
    this.store.deleteUser(user.id);
  }

  constructor(public store: UserStore) {
    this.store.loadUsers();
  }
}
