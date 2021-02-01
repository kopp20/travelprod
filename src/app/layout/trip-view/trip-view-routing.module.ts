import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripViewPage } from './trip-view.page';
  

const routes: Routes = [
  {
    path: ':id',
    component: TripViewPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripViewPageRoutingModule {}
