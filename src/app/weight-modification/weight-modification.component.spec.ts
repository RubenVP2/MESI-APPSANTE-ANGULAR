import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightModificationComponent } from './weight-modification.component';

describe('WeightModificationComponent', () => {
  let component: WeightModificationComponent;
  let fixture: ComponentFixture<WeightModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
