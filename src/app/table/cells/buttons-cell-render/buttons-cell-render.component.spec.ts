import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsCellRenderComponent } from './buttons-cell-render.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ButtonsCellRenderComponent', () => {
  let component: ButtonsCellRenderComponent;
  let fixture: ComponentFixture<ButtonsCellRenderComponent>;

  const params = {
    value: [
      { disabled: false, icon: 'push-to', tooltip: 'Push to', onClick: () => null },
      { disabled: false, icon: 'download', tooltip: 'Download', onClick: () => null },
    ],
    node: { rowHeight: 30 },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsCellRenderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init params on agInit', () => {
    component.agInit(params as any);
    expect(component.buttons).toEqual(params.value);
    expect(component.rowHeight).toBe('30px');
  });

  it('should init params on refresh', () => {
    const value = [params.value[0]];
    component.refresh({ ...params, value } as any);
    expect(component.buttons).toBe(value);
    expect(component.rowHeight).toBe('30px');
  });

  it('should return true if values is the same', () => {
    expect(component.refresh(params as any)).toBe(undefined);
    expect(component.refresh(params as any)).toBe(true);
  });
});
