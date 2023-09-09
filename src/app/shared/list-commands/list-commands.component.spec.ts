import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandsComponent } from './list-commands.component';

describe('ListCommandsComponent', () => {
  let component: ListCommandsComponent;
  let fixture: ComponentFixture<ListCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCommandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
