import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterPostComponent } from './after-post.component';

describe('AfterPostComponent', () => {
  let component: AfterPostComponent;
  let fixture: ComponentFixture<AfterPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
