import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { InputCellRendererParams, InputType, InputValueType } from './input-cell-renderer.model';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'niagara-input-cell-renderer',
  templateUrl: './input-cell-renderer.component.html',
  styleUrls: ['./input-cell-renderer.component.scss'],
  imports: [CommonModule, MatCheckboxModule, FormsModule, MatRadioModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCellRendererComponent<RowDataType extends { value: InputValueType }> implements ICellRendererAngularComp {
  public readonly InputType: typeof InputType = InputType;

  public inputType: InputType;
  public value: RowDataType['value'];
  public unit: string;
  public disabled: boolean;
  public validationErrors: string[] = [];
  public possibleValues: string[] = [];

  private validatorFn: (data?: RowDataType) => null | string[];
  private params: InputCellRendererParams<RowDataType>;

  constructor(private cdRef: ChangeDetectorRef) {}

  public agInit(params: InputCellRendererParams<RowDataType>): void {
    this.initParams(params);
  }

  public refresh(params: ICellRendererParams): boolean {
    if (this.value === params.value) {
      return true;
    }

    this.initParams(params);
    this.updateValidationState();
    this.cdRef.detectChanges();
  }

  public onValueChange(value: InputValueType): void {
    if (this.inputType === InputType.Number) {
      value = value === '' ? null : Number(value);
    }

    this.params.setValue(value);
    this.updateValidationState();
  }

  public onKeyPress(event: KeyboardEvent): boolean {
    if (this.inputType === InputType.Text) {
      return true;
    }
    return Number(event.key) > 0 || (event.key === '0' && this.value !== 0);
  }

  private initParams(params: InputCellRendererParams<RowDataType>): void {
    this.params = params;
    this.value = params.value;
    this.inputType = params.inputType?.(params.data) || InputType.Text;
    this.disabled = Boolean(params.disabled);
    this.unit = params.unit?.(params.data);
    this.validatorFn = params.validatorFn;
    this.possibleValues = params.data.values;
  }

  private updateValidationState(): void {
    this.validationErrors = this.validatorFn?.(this.params.data) || [];
  }
}
