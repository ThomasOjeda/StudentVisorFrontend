import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationDetailsDialogComponent } from './migration-details-dialog.component';

describe('MigrationDetailsDialogComponent', () => {
  let component: MigrationDetailsDialogComponent;
  let fixture: ComponentFixture<MigrationDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrationDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MigrationDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
