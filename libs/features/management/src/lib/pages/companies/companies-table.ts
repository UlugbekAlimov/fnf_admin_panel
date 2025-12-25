import { Component } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'company-table',
  standalone: true,
  imports: [TableModule, CommonModule, PaginatorModule],
  templateUrl: './companies-table.html',
})
export class CompaniesTable {
  products!: any[];

  first: number = 0;

  rows: number = 10;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
