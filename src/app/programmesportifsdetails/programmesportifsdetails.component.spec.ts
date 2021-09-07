import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesportifsdetailsComponent } from './programmesportifsdetails.component';

describe('ProgrammesportifsdetailsComponent', () => {
  let component: ProgrammesportifsdetailsComponent;
  let fixture: ComponentFixture<ProgrammesportifsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammesportifsdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammesportifsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
