import { Directive, HostListener } from '@angular/core';
import { ColumnResizedEvent } from 'ag-grid-community';

@Directive({
  standalone: true,
  selector: '[niagaraTableScrollOnResize]',
})
export class TableScrollOnResizeDirective {
  @HostListener('columnResized', ['$event'])
  public onColumnResize(event: ColumnResizedEvent): void {
    const expectedFields = ['viewportLeft', 'scrollWidth'];
    // need to get private fields for calculating left and right scroll offsets to implement auto scrolling
    const columnModel = (event.api as any)?.columnModel;
    if (!(expectedFields.every(field => columnModel?.hasOwnProperty(field)) && event.column)) {
      return;
    }

    const { viewportLeft, scrollWidth } = columnModel;
    const columnLeftOffset = event.column?.getLeft();
    const columnWidth = event.column?.getActualWidth();
    const isWholeColumnVisible = columnLeftOffset + columnWidth - viewportLeft <= scrollWidth;

    if (event.source === 'uiColumnDragged' && !isWholeColumnVisible) {
      event.api.ensureColumnVisible(event.column, 'end');
      return;
    }

    // handle left-side column visibility on decreasing the column to the left
    const nextColumn = event.api.getDisplayedColAfter(event.column);
    if (columnWidth + columnLeftOffset < viewportLeft && nextColumn) {
      event.api.ensureColumnVisible(nextColumn, 'start');
    }
  }
}
