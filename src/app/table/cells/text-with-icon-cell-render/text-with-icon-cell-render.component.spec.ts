import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextWithIconCellRenderComponent, TextWithIconCellValue } from './text-with-icon-cell-render.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

describe('TextWithIconCellRenderComponent', () => {
  let component: TextWithIconCellRenderComponent;
  let fixture: ComponentFixture<TextWithIconCellRenderComponent>;

  const params = {
    value: {
      text: 'mock',
      icon: 'mock_icon',
    } as TextWithIconCellValue,
  } as ICellRendererParams;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextWithIconCellRenderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWithIconCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init params on agInit', () => {
    component.agInit(params);
    expect(component.value).toBe(params.value);
  });

  it('should init params on refresh', () => {
    const value = { ...params.value, text: 'new_text' };
    component.refresh({ ...params, value });
    expect(component.value).toBe(value);
  });

  it('should return true if values is the same', () => {
    expect(component.refresh(params)).toBe(undefined);
    expect(component.refresh(params)).toBe(true);
  });
});
