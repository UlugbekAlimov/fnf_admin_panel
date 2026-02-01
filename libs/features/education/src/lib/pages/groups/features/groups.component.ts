import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiTableComponent } from 'libs/shared/table/table';
import { Button } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { Dialog } from 'primeng/dialog';
import { GroupCreate } from './ui/group-create/group-create';
import { GroupStore } from './model/group.store';

@Component({
  selector: 'education-groups',
  imports: [UiTableComponent, Button, DatePicker, Select, Dialog, GroupCreate],
  templateUrl: 'groups.component.html',
})
export class GroupsComponents {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public store: GroupStore
  ) {}
  columns: any[] = [
    { field: 'name', header: 'Course Name' },
    { field: 'city', header: 'Language' },
    { field: 'plan', header: 'Students' },
    { field: 'status', header: 'Status' },
    { field: 'created_at', header: 'Created At' },
  ];
  rowsPerPageOptions = [10, 20];
  pageSize = 10;
  currentPage = 1;
  loading = false;
  chipFields = ['status'];
  chipVariantFieldMap: Record<string, string> = {
    status: 'statusVariant',
  };
  selectedCompanies: any[] = [];
  showDialog = false;
  showDeleteDialog = false;
  selectedGroup: any | null = null;
  editingGroup: any | null = null;

  get mockCompanies() {
    return this.store.rows();
  }

  refresh() {
    this.store.loadGroups();
  }

  openCreate() {
    this.editingGroup = null;
    this.showDialog = true;
  }

  setPageFromPrime(event: any) {
    const rows = event?.rows ?? this.pageSize;
    const first = event?.first ?? 0;
    this.pageSize = rows;
    this.currentPage = Math.floor(first / rows) + 1;
  }

  detail(row: any) {
    if (!row?.id) return;
    this.router.navigate(['/education/groups', row.id]);
  }

  remove(row: any) {
    this.selectedGroup = row;
    this.showDeleteDialog = true;
  }

  edit(row: any) {
    this.editingGroup = row;
    this.showDialog = true;
  }

  createGroup(payload: any) {
    this.store.createGroup(payload, { closeOnSuccess: () => (this.showDialog = false) });
  }

  updateGroup(payload: { id: number; data: any }) {
    this.store.updateGroup(payload.id, payload.data, {
      closeOnSuccess: () => {
        this.showDialog = false;
        this.editingGroup = null;
      }
    });
  }

  confirmDelete() {
    if (!this.selectedGroup?.id) return;
    this.store.deleteGroup(this.selectedGroup.id);
    this.showDeleteDialog = false;
    this.selectedGroup = null;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
    this.selectedGroup = null;
  }

  ngOnInit() {
    this.store.loadGroups();
  }
}
