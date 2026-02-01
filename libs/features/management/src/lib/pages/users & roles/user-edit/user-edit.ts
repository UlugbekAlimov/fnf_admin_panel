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
  private dialogVisible = false;

  @Input() set visible(value: boolean) {
    this.dialogVisible = value;
    if (value && this.mode === 'create') {
      this.reset();
    }
  }
  get visible() {
    return this.dialogVisible;
  }
  @Input() mode: 'create' | 'edit' = 'edit';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();

  @Input() set user(value: any | null) {
    this.currentUser = value;
    if (value) {
      this.editName = value?.name ?? value?.company ?? '';
      this.editEmail = value?.email ?? '';
      this.editRole = value?.role ? { name: value.role } : null;
      this.editPlan = value?.plan ? { name: value.plan } : null;
      this.editStatus = value?.status ? { name: value.status } : null;
      this.editUsers = typeof value?.users === 'number' ? value.users : 0;
    } else if (this.mode === 'create') {
      this.reset();
    }
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
    if (this.mode === 'create') {
      const name = this.editName.trim();
      const email = this.editEmail.trim();
      if (!name || !email) {
        return;
      }

      const planName = this.editPlan?.name ?? 'Starter';
      const statusName = this.editStatus?.name ?? 'Active';

      const created = {
        company: name,
        name,
        email,
        role: this.editRole?.name ?? 'Viewer',
        plan: planName,
        status: statusName,
        users: this.editUsers || 0
      };

      this.create.emit(created);
      this.close();
      return;
    }

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
      company: this.currentUser.company ?? (this.editName.trim() || this.currentUser.company),
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

  private reset() {
    this.editName = '';
    this.editEmail = '';
    this.editRole = null;
    this.editPlan = null;
    this.editStatus = null;
    this.editUsers = 0;
  }
}
