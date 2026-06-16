import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  template?: any;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 border-b-2 border-gray-300">
            <th 
              *ngFor="let column of columns"
              [style.width]="column.width || 'auto'"
              class="px-4 py-3 text-left font-semibold text-gray-700 text-sm"
              (click)="onSort(column.key)"
              [class.cursor-pointer]="column.sortable"
            >
              <div class="flex items-center gap-2">
                {{ column.label }}
                <span *ngIf="column.sortable && sortColumn === column.key" class="text-xs">
                  {{ sortDirection === 'asc' ? '▲' : '▼' }}
                </span>
              </div>
            </th>
            <th *ngIf="actions" class="px-4 py-3 text-center font-semibold text-gray-700 text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            *ngFor="let row of data; let i = index"
            class="border-b border-gray-200 hover:bg-gray-50 transition"
          >
            <td 
              *ngFor="let column of columns"
              class="px-4 py-3 text-sm text-gray-800"
            >
              {{ row[column.key] }}
            </td>
            <td *ngIf="actions" class="px-4 py-3 text-center">
              <ng-content></ng-content>
            </td>
          </tr>
          <tr *ngIf="data.length === 0" class="border-b border-gray-200">
            <td [attr.colspan]="columns.length + (actions ? 1 : 0)" class="px-4 py-8 text-center text-gray-500">
              No data available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: []
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: boolean = false;
  @Input() sortColumn: string = '';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Output() sort = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();

  onSort(column: string): void {
    const col = this.columns.find(c => c.key === column);
    if (!col?.sortable) return;
    
    const newDirection = this.sortColumn === column && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sort.emit({ column, direction: newDirection });
  }
}
