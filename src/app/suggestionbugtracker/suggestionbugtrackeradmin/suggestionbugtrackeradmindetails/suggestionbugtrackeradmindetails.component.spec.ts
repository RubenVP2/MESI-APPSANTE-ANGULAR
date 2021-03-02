import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionbugtrackeradmindetailsComponent } from './suggestionbugtrackeradmindetails.component';

describe('SuggestionbugtrackeradmindetailsComponent', () => {
  let component: SuggestionbugtrackeradmindetailsComponent;
  let fixture: ComponentFixture<SuggestionbugtrackeradmindetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionbugtrackeradmindetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionbugtrackeradmindetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
