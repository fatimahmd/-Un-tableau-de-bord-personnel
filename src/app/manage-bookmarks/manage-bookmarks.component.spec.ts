import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookmarksComponent } from './manage-bookmarks.component';

describe('ManageBookmarksComponent', () => {
  let component: ManageBookmarksComponent;
  let fixture: ComponentFixture<ManageBookmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBookmarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
