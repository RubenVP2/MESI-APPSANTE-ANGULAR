import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprogrammesportifsComponent } from './updateprogrammesportifs.component';

describe('UpdateprogrammesportifsComponent', () => {
  let component: UpdateprogrammesportifsComponent;
  let fixture: ComponentFixture<UpdateprogrammesportifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateprogrammesportifsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateprogrammesportifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
