import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueWeightComponent } from './historique-weight.component';

describe('HistoriqueWeightComponent', () => {
  let component: HistoriqueWeightComponent;
  let fixture: ComponentFixture<HistoriqueWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
