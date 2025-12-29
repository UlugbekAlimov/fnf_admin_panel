import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'management-roles',
  standalone: true,
  imports: [FormsModule, Button, Dialog, InputTextModule, CommonModule],
  templateUrl: './roles.html',
})
export class RolesPage {
  showDialog = false;
  roles = [
    {
      name: 'Teacher',
      description: 'Can manage classes and assignments.',
      usersCount: 12,
    },
    {
      name: 'Admin',
      description: 'Full access to management settings.',
      usersCount: 3,
    },
  ];

  newRoleName = '';
  newRoleDescription = '';
  newRoleUsersCount = 0;

  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  createRole() {
    const name = this.newRoleName.trim();
    if (!name) {
      return;
    }

    const description = this.newRoleDescription.trim();
    const usersCount =
      typeof this.newRoleUsersCount === 'number' && !Number.isNaN(this.newRoleUsersCount)
        ? this.newRoleUsersCount
        : 0;

    this.roles = [
      ...this.roles,
      {
        name,
        description,
        usersCount,
      },
    ];

    this.newRoleName = '';
    this.newRoleDescription = '';
    this.newRoleUsersCount = 0;
    this.showDialog = false;
  }
}
