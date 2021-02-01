import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
      path: 'create-trip',
      loadChildren: () => import('./create-trip/create-trip.module').then( m => m.CreateTripPageModule)
    },
    {
      path: 'places-map',
      loadChildren: () => import('./places-map/places-map.module').then( m => m.PlacesMapPageModule)
    },
    {
      path: 'create-place',
      loadChildren: () => import('./create-place/create-place.module').then( m => m.CreatePlacePageModule)
    },
    {
      path: '',
      redirectTo: "places-map",
      pathMatch: "full"
    },
    {
      path: 'place-view',
      loadChildren: () => import('./place-view/place-view.module').then( m => m.PlaceViewPageModule)
    },
    {
      path: 'trip-view',
      loadChildren: () => import('./trip-view/trip-view.module').then( m => m.TripViewPageModule)
    },
    ]
  },
  {
    path: 'take-picture',
    loadChildren: () => import('./take-picture/take-picture.module').then( m => m.TakePicturePageModule)
  },
  {
     path: 'place-view',
    loadChildren: () => import('./place-view/place-view.module').then( m => m.PlaceViewPageModule)
  },
  {
    path: 'trip-view',
    loadChildren: () => import('./trip-view/trip-view.module').then( m => m.TripViewPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
