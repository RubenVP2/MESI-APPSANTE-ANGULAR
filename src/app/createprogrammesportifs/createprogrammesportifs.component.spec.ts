import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprogrammesportifsComponent } from './createprogrammesportifs.component';

describe('CreateprogrammesportifsComponent', () => {
  let component: CreateprogrammesportifsComponent;
  let fixture: ComponentFixture<CreateprogrammesportifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateprogrammesportifsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateprogrammesportifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
