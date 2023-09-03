import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadeLoadingSpinnerComponent } from './shade-loading-spinner.component';

describe('ShadeLoadingSpinnerComponent', () => {
  let component: ShadeLoadingSpinnerComponent;
  let fixture: ComponentFixture<ShadeLoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadeLoadingSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShadeLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
