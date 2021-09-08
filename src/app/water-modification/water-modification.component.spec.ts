import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterModificationComponent } from './water-modification.component';

describe('WaterModificationComponent', () => {
  let component: WaterModificationComponent;
  let fixture: ComponentFixture<WaterModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
