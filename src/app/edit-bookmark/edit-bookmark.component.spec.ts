import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookmarkComponent } from './edit-bookmark.component';

describe('EditBookmarkComponent', () => {
  let component: EditBookmarkComponent;
  let fixture: ComponentFixture<EditBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBookmarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
