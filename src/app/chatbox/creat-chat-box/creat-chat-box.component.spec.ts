import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatChatBoxComponent } from './creat-chat-box.component';

describe('CreatChatBoxComponent', () => {
  let component: CreatChatBoxComponent;
  let fixture: ComponentFixture<CreatChatBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatChatBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
