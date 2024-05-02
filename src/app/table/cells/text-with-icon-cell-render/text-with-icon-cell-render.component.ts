import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

export interface TextWithIconCellValue {
  text: string;
  icon: string;
  iconStyle?: 'info' | 'warning' | 'error';
  iconTooltip?: string;
}

@Component({
  standalone: true,
  selector: 'niagara-text-with-icon-cell-render',
  templateUrl: './text-with-icon-cell-render.component.html',
  styleUrls: ['./text-with-icon-cell-render.component.scss'],
  imports: [CommonModule, NgbTooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextWithIconCellRenderComponent implements ICellRendererAngularComp {
  public value: TextWithIconCellValue;

  public get iconClasses(): string[] {
    return this.value && [this.value.icon, this.value.iconStyle].filter(Boolean);
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  public agInit(params: ICellRendererParams): void {
    this.initParams(params);
  }

  public refresh(params: ICellRendererParams): boolean {
    if (this.value === params.value) {
      return true;
    }

    this.initParams(params);
  }

  private initParams(params: ICellRendererParams): void {
    this.value = params.value;
    this.cdRef.detectChanges();
  }
}
