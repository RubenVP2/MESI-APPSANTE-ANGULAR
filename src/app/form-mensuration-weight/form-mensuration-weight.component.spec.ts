import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMensurationWidhtComponent } from './form-mensuration-weight.component';

describe('FormMensurationWidhtComponent', () => {
  let component: FormMensurationWidhtComponent;
  let fixture: ComponentFixture<FormMensurationWidhtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMensurationWidhtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMensurationWidhtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
