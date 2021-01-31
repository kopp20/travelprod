import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceViewPage } from './place-view.page';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  {
    path: '',
    component: PlaceViewPage
  },
  {
    path: ':id',
    component: ProfilComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceViewPageRoutingModule {}
