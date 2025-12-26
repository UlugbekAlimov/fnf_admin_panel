import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { ChipComponent } from '../chip/chip';

import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

export type UiTableColumn = {
  field: string;
  header: string;
};

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [CommonModule, TableModule, PaginatorModule, ChipComponent],
  templateUrl: './table.html',
})
export class UiTableComponent {
  @Input() value: any[] = [];
  @Input() columns: UiTableColumn[] = [];
  @Input() showPhoto = false;
  @Input() photoField = 'photo';
  @Input() photoAltField = 'name';
  @Input() photoHeader = '';
  @Input() photoClass = 'w-10 h-10 rounded-full object-cover';
  @Input() chipHeader = 'Status';
  @Input() actionsHeader = 'Actions';
  @Input() chipFields: string[] = [];
  @Input() chipVariantField = 'statusVariant';
  @Input() chipVariantFieldMap: Record<string, string> = {};
  @Input() chipIconField = 'chipIcon';
  @Input() chipIconFieldMap: Record<string, string> = {};
  @Input() totalRecords = 0;
  @Input() rows = 10;
  @Input() first = 0;
  @Input() rowsPerPageOptions: number[] = [10, 20, 30];
  @Input() showPaginator = true;
  @Input() emptyMessage = 'No records found';
  @Input() tableStyle: Record<string, string> = { 'min-width': '50rem' };

  @ContentChild('chip', { read: TemplateRef }) chipTemplate?: TemplateRef<any>;
  @ContentChild('actions', { read: TemplateRef }) actionsTemplate?: TemplateRef<any>;

  @Output() pageChange = new EventEmitter<PaginatorState>();

  get totalColumns() {
    return (
      this.columns.length +
      (this.showPhoto ? 1 : 0) +
      (this.chipTemplate ? 1 : 0) +
      (this.actionsTemplate ? 1 : 0)
    );
  }

  isChipField(field: string): boolean {
    return this.chipFields.includes(field);
  }

  getChipVariantField(field: string): string {
    return this.chipVariantFieldMap[field] ?? this.chipVariantField;
  }

  getChipIconField(field: string): string {
    return this.chipIconFieldMap[field] ?? this.chipIconField;
  }

  handlePageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? this.rows;
    this.pageChange.emit(event);
  }

  showActions(row: any): boolean {
    return row && row.canPerformAction;
  }

  onAction(row: any) {
    console.log('Action performed on', row);
  }
}
