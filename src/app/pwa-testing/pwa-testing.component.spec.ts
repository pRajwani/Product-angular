import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaTestingComponent } from './pwa-testing.component';

describe('PwaTestingComponent', () => {
  let component: PwaTestingComponent;
  let fixture: ComponentFixture<PwaTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwaTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwaTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
