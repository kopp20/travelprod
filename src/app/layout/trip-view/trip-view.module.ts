import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripViewPageRoutingModule } from './trip-view-routing.module';

import { TripViewPage } from './trip-view.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripViewPageRoutingModule
  ],
  declarations: [TripViewPage]
})
export class TripViewPageModule {}
