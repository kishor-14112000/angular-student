import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetsStartComponent } from './lets-start.component';

describe('LetsStartComponent', () => {
  let component: LetsStartComponent;
  let fixture: ComponentFixture<LetsStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetsStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
