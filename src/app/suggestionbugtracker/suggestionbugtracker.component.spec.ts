import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionbugtrackerComponent } from './suggestionbugtracker.component';

describe('SuggestionbugtrackerComponent', () => {
  let component: SuggestionbugtrackerComponent;
  let fixture: ComponentFixture<SuggestionbugtrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionbugtrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionbugtrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
