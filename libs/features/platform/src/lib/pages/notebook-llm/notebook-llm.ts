import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { UiTableComponent } from '../../../../../../shared/table/table';
import { NotebookStore } from './model/notebook.store';

@Component({
  selector: 'platform-notebook-llm',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, Dialog, InputTextModule, Select, UiTableComponent],
  templateUrl: './notebook-llm.html',
})
export class NotebookLlmPage {
  search = '';
  visibilityOptions = [{ name: 'All' }, { name: 'Private' }, { name: 'Shared' }];
  statusOptions = [{ name: 'Active' }, { name: 'Draft' }, { name: 'Archived' }];
  formVisibilityOptions = [{ name: 'Private' }, { name: 'Shared' }];
  formStatusOptions = [{ name: 'Active' }, { name: 'Draft' }, { name: 'Archived' }];
  selectedVisibility = this.visibilityOptions[0];
  selectedStatus = this.statusOptions[0];
  showDeleteDialog = false;
  showCreateDialog = false;
  deletingNotebookId: number | null = null;
  deletingNotebookName = '';
  editingNotebookId: number | null = null;
  formName = '';
  formOwner = '';
  formTokens: number | null = null;
  formLastEdited = '';
  formStatus = this.formStatusOptions[0];
  formVisibility = this.formVisibilityOptions[0];

  columns = [
    { field: 'name', header: 'Notebook' },
    { field: 'owner', header: 'Owner' },
    { field: 'lastEdited', header: 'Last Edited' },
    { field: 'tokens', header: 'Tokens' },
    { field: 'status', header: 'Status' },
  ];

  chipFields = ['status'];
  chipVariantFieldMap = { status: 'statusVariant' };

  get notebooks() {
    return this.store.rows();
  }

  get isEditMode(): boolean {
    return this.editingNotebookId !== null;
  }

  refresh() {
    this.store.loadNotebooks();
  }

  openCreateNotebook() {
    this.editingNotebookId = null;
    this.resetForm();
    this.showCreateDialog = true;
  }

  openEditNotebook(row: {
    id: number;
    name: string;
    owner: string;
    tokens: number;
    lastEdited: string;
    status: string;
    visibility?: string;
  }) {
    this.editingNotebookId = row.id;
    this.formName = row.name ?? '';
    this.formOwner = row.owner ?? '';
    this.formTokens = typeof row.tokens === 'number' ? row.tokens : null;
    this.formLastEdited = row.lastEdited ?? '';
    this.formStatus =
      this.formStatusOptions.find((opt) => opt.name === row.status) ?? this.formStatusOptions[0];
    this.formVisibility =
      this.formVisibilityOptions.find((opt) => opt.name === row.visibility) ??
      this.formVisibilityOptions[0];
    this.showCreateDialog = true;
  }

  handleCreateDialogHide(value: boolean) {
    if (!value) {
      this.resetForm();
      this.showCreateDialog = false;
    }
  }

  submitNotebook() {
    const name = this.formName.trim();
    const owner = this.formOwner.trim();
    if (!name || !owner) {
      return;
    }

    const payload = {
      name,
      owner,
      tokens: typeof this.formTokens === 'number' ? this.formTokens : 0,
      lastEdited: this.formLastEdited || new Date().toISOString().slice(0, 10),
      status: this.formStatus?.name ?? 'Active',
      visibility: (this.formVisibility?.name ?? 'Private') as 'Private' | 'Shared',
    };

    if (this.isEditMode && this.editingNotebookId !== null) {
      this.store.updateNotebook(this.editingNotebookId, payload);
    } else {
      this.store.createNotebook(payload);
    }

    this.showCreateDialog = false;
    this.resetForm();
  }

  openDeleteNotebook(row: { id: number; name?: string }) {
    this.deletingNotebookId = row.id;
    this.deletingNotebookName = row.name ?? '';
    this.showDeleteDialog = true;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
    this.deletingNotebookId = null;
    this.deletingNotebookName = '';
  }

  deleteNotebook() {
    if (this.deletingNotebookId === null) {
      return;
    }
    this.store.deleteNotebook(this.deletingNotebookId);
    this.closeDeleteDialog();
  }

  private resetForm() {
    this.formName = '';
    this.formOwner = '';
    this.formTokens = null;
    this.formLastEdited = '';
    this.formStatus = this.formStatusOptions[0];
    this.formVisibility = this.formVisibilityOptions[0];
  }

  constructor(public store: NotebookStore) {
    this.store.loadNotebooks();
  }
}
