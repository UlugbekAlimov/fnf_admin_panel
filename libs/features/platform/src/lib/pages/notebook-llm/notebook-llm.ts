import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { UiTableComponent } from '../../../../../../shared/table/table';

@Component({
  selector: 'platform-notebook-llm',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, InputTextModule, Select, UiTableComponent],
  templateUrl: './notebook-llm.html',
})
export class NotebookLlmPage {
  search = '';
  visibilityOptions = [{ name: 'All' }, { name: 'Private' }, { name: 'Shared' }];
  statusOptions = [{ name: 'Active' }, { name: 'Draft' }, { name: 'Archived' }];
  selectedVisibility = this.visibilityOptions[0];
  selectedStatus = this.statusOptions[0];

  notebooks = [
    {
      id: 1,
      name: 'Admissions Assistant',
      owner: 'A. Rivera',
      lastEdited: '2026-01-17',
      tokens: 12800,
      status: 'Active',
      statusVariant: 'success',
    },
    {
      id: 2,
      name: 'Course Planner',
      owner: 'M. Lee',
      lastEdited: '2026-01-13',
      tokens: 6200,
      status: 'Draft',
      statusVariant: 'warning',
    },
    {
      id: 3,
      name: 'Support Knowledge Base',
      owner: 'Team',
      lastEdited: '2026-01-09',
      tokens: 9100,
      status: 'Archived',
      statusVariant: 'danger',
    },
  ];

  columns = [
    { field: 'name', header: 'Notebook' },
    { field: 'owner', header: 'Owner' },
    { field: 'lastEdited', header: 'Last Edited' },
    { field: 'tokens', header: 'Tokens' },
    { field: 'status', header: 'Status' },
  ];

  chipFields = ['status'];
  chipVariantFieldMap = { status: 'statusVariant' };

  refresh() {
    // Placeholder for reload action.
  }
}
