import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelFileInputComponent } from './excel-file-input.component';

describe('ExcelFileInputComponent', () => {
  let component: ExcelFileInputComponent;
  let fixture: ComponentFixture<ExcelFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelFileInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
