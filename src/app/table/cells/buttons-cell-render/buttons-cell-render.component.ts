import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IRowNode, RowNode } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

export interface TableButton {
  icon?: string;
  label?: string;
  tooltip?: string;
  disabled?: boolean;
  onClick: (rowNode?: RowNode) => void;
}

@Component({
  standalone: true,
  selector: 'niagara-buttons-cell-render',
  templateUrl: './buttons-cell-render.component.html',
  styleUrls: ['./buttons-cell-render.component.scss'],
  imports: [CommonModule, NgbTooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsCellRenderComponent implements ICellRendererAngularComp {
  @HostBinding('style.height') public rowHeight: string = '40px';

  public buttons: TableButton[];
  public rowNode: IRowNode;

  constructor(private cdRef: ChangeDetectorRef) {}

  public agInit(params: ICellRendererParams): void {
    this.initParams(params);
  }

  public refresh(params: ICellRendererParams): boolean {
    if (this.buttons === params.value) {
      return true;
    }

    this.initParams(params);
  }

  private initParams({ value, node }: { value: TableButton[]; node: IRowNode }): void {
    this.buttons = value || [];
    this.rowNode = node;
    this.initRowHeight(node);
    this.cdRef.detectChanges();
  }

  private initRowHeight(node: IRowNode): void {
    this.rowHeight = `${node.rowHeight}px`;
  }
}
