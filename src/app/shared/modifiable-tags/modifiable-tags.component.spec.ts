import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiableTagsComponent } from './modifiable-tags.component';

describe('ModifiableTagsComponent', () => {
  let component: ModifiableTagsComponent;
  let fixture: ComponentFixture<ModifiableTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifiableTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiableTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
