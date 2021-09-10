import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueWaterComponent } from './historique-water.component';

describe('HistoriqueWaterComponent', () => {
  let component: HistoriqueWaterComponent;
  let fixture: ComponentFixture<HistoriqueWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueWaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
