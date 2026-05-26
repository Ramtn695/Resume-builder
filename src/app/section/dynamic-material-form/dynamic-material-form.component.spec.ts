import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMaterialFormComponent } from './dynamic-material-form.component';

describe('DynamicMaterialFormComponent', () => {
  let component: DynamicMaterialFormComponent;
  let fixture: ComponentFixture<DynamicMaterialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicMaterialFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicMaterialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
