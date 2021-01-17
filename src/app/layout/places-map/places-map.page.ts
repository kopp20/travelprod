import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { environment } from "src/environments/environment";
import { PlaceMapService } from './places-map.service';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.page.html',
  styleUrls: ['./places-map.page.scss'],
})
export class PlacesMapPage implements OnInit, OnDestroy {

  map: L.Map;

  //private locationSubs: Subscription;
  maListe: Array<any>;
  geolocationPoints: L.LatLngTuple[];
  markerId: string = "8f79cb4f-f3d7-473d-9bfe-31c85766f4ae";

  constructor(private plcMapService: PlaceMapService) { }

  ngOnInit() {
    /* this.locationSubs = this.plcMapService.locationChanged.subscribe(list => {
      this.geolocationPoints = list;
      console.log(list)
      this.leafletMap(list);
    }); */
    /* this.plcMapService.fetchPlaces(); */



    /* this.plcMapService.getMarkersbyTripId(this.markerId).subscribe(result => {
      this.leafletMap(result);
    }) */

    this.plcMapService.getPlacesbyTripId(this.markerId).subscribe(result => {
      console.log(result)
      this.maListe = result;
      this.leafletMarkers(this.maListe);
      
    })

    this.plcMapService.getMarkersbyTripId(this.markerId).subscribe(result => {
      console.log(result)
      this.leafletLines(result)
    })

    this.map = new L.Map('map');
  }

  ngOnDestroy() {
    /* this.locationSubs.unsubscribe(); */
  }

  ionViewDidEnter() {

    const test = this.map.setView([46.947684, 7.395939], 16);

    L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=CLh9srebP4AGiZBhlqC1Ru2R0EuX5ywlP45a9Pm01VP3mdImGZz2rqdP2deHhGaq', {
      attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      accessToken: 'CLh9srebP4AGiZBhlqC1Ru2R0EuX5ywlP45a9Pm01VP3mdImGZz2rqdP2deHhGaq'
    }).addTo(this.map);

  }

  myIcon = L.icon({
    iconUrl: 'https://saiykoh.com/a/icon.png',

    iconSize: [25, 25], // size of the icon
    iconAnchor: [10, 15], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });



  leafletMarkers( places: Array<any>) {
    for (const place of places) {
      L.marker(place.location.coordinates, { icon: this.myIcon }).addTo(this.map).on('click', function(e) {
        console.log(place.name);
        console.log(place);
    });
    }
  }

  leafletLines(pointList: L.LatLngTuple[]) {
    const firstpolyline = new L.Polyline(pointList, {
      color: 'violet',
      weight: 3,
      opacity: 0.5,
      smoothFactor: 3
  });
  firstpolyline.addTo(this.map);
  }

  ionViewWillLeave() {
    //this.map.remove();
  }

}

