import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { completeIconSet } from '@rtds/icons';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    component.type = completeIconSet[0].name;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
