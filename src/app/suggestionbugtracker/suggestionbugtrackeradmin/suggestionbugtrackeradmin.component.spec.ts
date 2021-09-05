import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionbugtrackeradminComponent } from './suggestionbugtrackeradmin.component';

describe('SuggestionbugtrackeradminComponent', () => {
  let component: SuggestionbugtrackeradminComponent;
  let fixture: ComponentFixture<SuggestionbugtrackeradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionbugtrackeradminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionbugtrackeradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
