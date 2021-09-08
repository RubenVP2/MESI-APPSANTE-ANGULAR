import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightAndSleepComponent } from './weight-and-sleep.component';

describe('WeightAndSleepComponent', () => {
  let component: WeightAndSleepComponent;
  let fixture: ComponentFixture<WeightAndSleepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightAndSleepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightAndSleepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
