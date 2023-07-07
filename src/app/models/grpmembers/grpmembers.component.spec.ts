import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpmembersComponent } from './grpmembers.component';

describe('GrpmembersComponent', () => {
  let component: GrpmembersComponent;
  let fixture: ComponentFixture<GrpmembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpmembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
