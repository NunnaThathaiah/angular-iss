import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColumnResizedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { TableScrollOnResizeDirective } from './table-scroll-on-resize.directive';

@Component({
  template: `<div>
    <ag-grid-angular class="ag-theme-alpine" [columnDefs]="columnDefs" [rowData]="rowData" (gridReady)="onGridReady($event)">
    </ag-grid-angular>
  </div>`,
})
class TestTableHostComponent {
  public rowData: any[] = [{ name: 'test name' }];

  public columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      field: 'name',
    },
  ];

  public gridApi: GridApi;

  public onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

describe('AgGridProperties', () => {
  let component: TestTableHostComponent;
  let fixture: ComponentFixture<TestTableHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, AgGridModule],
      declarations: [TestTableHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTableHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain specific private fields in the columnModel ', async(async () => {
    await fixture.whenStable();
    const columnModel = (component.gridApi as any).columnModel;
    expect(columnModel).toBeTruthy();
    const expectedFields = ['viewportLeft', 'scrollWidth'];
    expectedFields.forEach(field => {
      expect(columnModel[field]).not.toBeUndefined();
    });
  }));
});

describe('TableAutoScrollDirective', () => {
  let directive: TableScrollOnResizeDirective;

  beforeEach(() => {
    directive = new TableScrollOnResizeDirective();
  });

  it('should do nothing and exit from resize handler', () => {
    let event = {
      columnApi: null,
    } as ColumnResizedEvent;
    expect(directive.onColumnResize(event)).toBeUndefined();

    event = {
      columnApi: {
        columnModel: {
          viewportLeft: 1,
        },
      },
    } as any;
    expect(directive.onColumnResize(event)).toBeUndefined();

    event = {
      columnApi: {
        columnModel: {
          viewportLeft: 18,
          scrollWidth: 22,
        },
      },
    } as any;
    expect(directive.onColumnResize(event)).toBeUndefined();
  });

  it('should scroll to end of current draggable column', () => {
    const event = {
      columnApi: {
        columnModel: {
          viewportLeft: 18,
          scrollWidth: 22,
        },
        getDisplayedColAfter: () => {},
      },
      column: {
        getLeft: () => 12,
        getActualWidth: () => 500,
      },
      source: 'uiColumnDragged',
      api: {
        ensureColumnVisible: () => {},
      },
    } as any;
    expect(directive.onColumnResize(event)).toBeUndefined();
  });

  it('should scroll to start of next one after draggable column', () => {
    const event = {
      columnApi: {
        columnModel: {
          viewportLeft: 1218,
          scrollWidth: 1000,
        },
        getDisplayedColAfter: () => ({
          column: {},
        }),
      },
      column: {
        getLeft: () => 12,
        getActualWidth: () => 100,
      },
      source: 'uiColumnDragged',
      api: {
        ensureColumnVisible: () => {},
      },
    } as any;
    expect(directive.onColumnResize(event)).toBeUndefined();
  });
});
