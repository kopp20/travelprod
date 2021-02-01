import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceViewPage } from './place-view.page';


const routes: Routes = [
  {
    path: ':id',
    component: PlaceViewPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceViewPageRoutingModule {}
