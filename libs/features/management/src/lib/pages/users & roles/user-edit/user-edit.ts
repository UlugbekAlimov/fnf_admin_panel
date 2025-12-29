import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

@Component({
  selector: 'user-edit',
  standalone: true,
  imports: [FormsModule, Button, Dialog, InputTextModule, Select],
  templateUrl: './user-edit.html',
})
export class UserEdit {
  private currentUser: any | null = null;

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<any>();

  @Input() set user(value: any | null) {
    this.currentUser = value;
    this.editName = value?.name ?? value?.company ?? '';
    this.editEmail = value?.email ?? '';
    this.editRole = value?.role ? { name: value.role } : null;
    this.editPlan = value?.plan ? { name: value.plan } : null;
    this.editStatus = value?.status ? { name: value.status } : null;
    this.editUsers = typeof value?.users === 'number' ? value.users : 0;
  }
  get user() {
    return this.currentUser;
  }

  editName = '';
  editEmail = '';
  editRole: { name: string } | null = null;
  editPlan: { name: string } | null = null;
  editStatus: { name: string } | null = null;
  editUsers = 0;

  roles = [{ name: 'Manager' }, { name: 'Owner' }, { name: 'Viewer' }];
  plans = [{ name: 'Enterprise' }, { name: 'Pro' }, { name: 'Starter' }];
  statuses = [{ name: 'Active' }, { name: 'Pending' }, { name: 'Inactive' }];

  close() {
    this.visibleChange.emit(false);
  }

  submit() {
    if (!this.currentUser) {
      this.close();
      return;
    }

    const planName = this.editPlan?.name ?? this.currentUser.plan;
    const statusName = this.editStatus?.name ?? this.currentUser.status;
    const planMeta: Record<string, { variant: string; icon: string }> = {
      Enterprise: { variant: 'success', icon: 'pi pi-bolt' },
      Pro: { variant: 'info', icon: 'pi pi-box' },
      Starter: { variant: 'warning', icon: 'pi pi-star' },
    };
    const statusMeta: Record<string, { variant: string; icon: string }> = {
      Active: { variant: 'success', icon: 'pi pi-check' },
      Pending: { variant: 'warning', icon: 'pi pi-clock' },
      Inactive: { variant: 'danger', icon: 'pi pi-times' },
    };

    const updated = {
      ...this.currentUser,
      name: this.editName.trim() || this.currentUser.name,
      company: this.currentUser.company ?? this.editName.trim() || this.currentUser.company,
      email: this.editEmail.trim() || this.currentUser.email,
      role: this.editRole?.name ?? this.currentUser.role,
      plan: planName,
      status: statusName,
      users: this.editUsers,
      planVariant: planMeta[planName]?.variant ?? this.currentUser.planVariant,
      planIcon: planMeta[planName]?.icon ?? this.currentUser.planIcon,
      statusVariant: statusMeta[statusName]?.variant ?? this.currentUser.statusVariant,
      statusIcon: statusMeta[statusName]?.icon ?? this.currentUser.statusIcon,
    };

    this.save.emit(updated);
    this.close();
  }
}
