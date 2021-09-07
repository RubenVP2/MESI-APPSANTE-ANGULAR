import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateexerciceComponent } from './createexercice.component';

describe('CreateexerciceComponent', () => {
  let component: CreateexerciceComponent;
  let fixture: ComponentFixture<CreateexerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateexerciceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateexerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
