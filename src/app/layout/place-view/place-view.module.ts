import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceViewPageRoutingModule } from './place-view-routing.module';

import { PlaceViewPage } from './place-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceViewPageRoutingModule
  ],
  declarations: [PlaceViewPage]
})
export class PlaceViewPageModule {}
