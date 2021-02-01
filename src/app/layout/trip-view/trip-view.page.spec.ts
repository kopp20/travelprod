import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TripViewPage } from './trip-view.page';

describe('TripViewPage', () => {
  let component: TripViewPage;
  let fixture: ComponentFixture<TripViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TripViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
