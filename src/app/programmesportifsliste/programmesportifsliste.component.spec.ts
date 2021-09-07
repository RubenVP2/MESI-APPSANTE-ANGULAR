import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesportifslisteComponent } from './programmesportifsliste.component';

describe('ProgrammesportifslisteComponent', () => {
  let component: ProgrammesportifslisteComponent;
  let fixture: ComponentFixture<ProgrammesportifslisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammesportifslisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammesportifslisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
