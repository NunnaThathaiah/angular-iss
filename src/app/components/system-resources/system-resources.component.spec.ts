import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemResourcesComponent } from './system-resources.component';

describe('SystemResourcesComponent', () => {
  let component: SystemResourcesComponent;
  let fixture: ComponentFixture<SystemResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemResourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
