import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputCellRendererComponent } from './input-cell-renderer.component';
import { InputType } from './input-cell-renderer.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputCellRendererComponent', () => {
  let component: InputCellRendererComponent<{ value: any }>;
  let fixture: ComponentFixture<InputCellRendererComponent<{ value: any }>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCellRendererComponent, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent<InputCellRendererComponent<{ value: boolean }>>(InputCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Init params', () => {
    const params = {
      value: 123,
      inputType: () => InputType.Number,
      disabled: true,
      unit: () => 'mock_unit',
      data: {
        possibleValues: [],
      },
    };

    it('should init params on agInit', () => {
      component.agInit(params as any);

      expect(component.value).toBe(params.value);
      expect(component.inputType).toBe(params.inputType());
      expect(component.disabled).toBe(params.disabled);
      expect(component.unit).toBe(params.unit());
    });

    it('should handle setup without custom params', () => {
      const minimumParams = {
        value: 123,
        data: {
          possibleValues: [],
        },
      };
      component.agInit(minimumParams as any);

      expect(component.value).toBe(minimumParams.value);
      expect(component.inputType).toBe(InputType.Text);
      expect(component.disabled).toBe(false);
    });

    describe('Refresh', () => {
      it('should init params on refresh', () => {
        const value = params.value + 1;
        component.refresh({ ...params, value } as any);

        expect(component.value).toBe(value);
        expect(component.inputType).toBe(params.inputType());
        expect(component.disabled).toBe(params.disabled);
        expect(component.unit).toBe(params.unit());
      });

      it('should return true if values is the same', () => {
        expect(component.refresh(params as any)).toBe(undefined);
        expect(component.refresh(params as any)).toBe(true);
      });
    });
  });

  describe('On value change', () => {
    let params;

    beforeEach(() => {
      params = {
        inputType: () => InputType.Text,
        setValue: jest.fn(),
        data: {
          possibleValues: [],
        },
      };
    });

    it('should pass string value as is', () => {
      component.agInit(params as any);
      const value = '';
      component.onValueChange(value);
      expect(params.setValue).toHaveBeenCalledWith(value);
      expect(params.setValue).toHaveBeenCalledTimes(1);
    });

    it('should call validationFn', () => {
      params = {
        ...params,
        validatorFn: jest.fn(),
        data: { value: 111 },
      };
      component.agInit(params);

      const value = '';
      component.onValueChange(value);
      expect(params.validatorFn).toHaveBeenCalledWith(params.data);
      expect(params.validatorFn).toHaveBeenCalledTimes(1);
    });

    it('should not allow type float value', () => {
      expect(component.onKeyPress({ key: '1' } as any)).toBeTruthy();
      expect(component.onKeyPress({ key: '.' } as any)).toBeFalsy();
    });

    describe('Numeric input type', () => {
      beforeEach(() => {
        params = {
          inputType: () => InputType.Number,
          setValue: jest.fn(),
          data: {
            possibleValues: [],
          },
        };
        component.agInit(params);
      });

      it('should convert string to number', () => {
        component.onValueChange('123');
        expect(params.setValue).toHaveBeenCalledWith(123);
        expect(params.setValue).toHaveBeenCalledTimes(1);
      });

      it('should convert to null if string empty', () => {
        component.onValueChange('');
        expect(params.setValue).toHaveBeenCalledWith(null);
        expect(params.setValue).toHaveBeenCalledTimes(1);
      });
    });
  });
});
