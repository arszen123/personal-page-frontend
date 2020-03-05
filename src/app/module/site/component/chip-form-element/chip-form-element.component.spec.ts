import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipFormElementComponent } from './chip-form-element.component';

describe('ChipFormElementComponent', () => {
  let component: ChipFormElementComponent;
  let fixture: ComponentFixture<ChipFormElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipFormElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipFormElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
