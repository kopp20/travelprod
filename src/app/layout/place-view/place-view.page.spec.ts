import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaceViewPage } from './place-view.page';

describe('PlaceViewPage', () => {
  let component: PlaceViewPage;
  let fixture: ComponentFixture<PlaceViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
