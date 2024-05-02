import { ICellRendererParams } from 'ag-grid-community';

export enum InputType {
  Text = 'text',
  Number = 'number',
  Checkbox = 'checkbox',
  RadioButton = 'radioButton',
}

export type InputValueType = string | number | boolean;

interface InputCellRendererCustomParams<RowDataType> {
  inputType?: (data: RowDataType) => InputType;
  unit?: (data: RowDataType) => string;
  disabled?: boolean;
  validatorFn?: (data: RowDataType) => null | string[];
}

export type InputCellRendererParams<RowDataType> = ICellRendererParams & InputCellRendererCustomParams<RowDataType>;
