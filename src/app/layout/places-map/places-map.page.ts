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

  private locationSubs: Subscription;

  geolocationPoints: L.LatLngTuple[];
  propertyList = [];
  error: string;
  constructor(private plcMapService : PlaceMapService) {
  }

  ngOnInit(){
    this.locationSubs = this.plcMapService.locationChanged.subscribe(list => {
      this.geolocationPoints = list;
      console.log(list)
      this.leafletMap(list);
    });
    this.plcMapService.fetchPlaces();

    this.map = new L.Map('map');
  }

  ngOnDestroy() {
    this.locationSubs.unsubscribe();
  }

  ionViewDidEnter() {
    
    this.map.setView([46.947684, 7.395939], 16);

    L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=CLh9srebP4AGiZBhlqC1Ru2R0EuX5ywlP45a9Pm01VP3mdImGZz2rqdP2deHhGaq', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	accessToken: 'CLh9srebP4AGiZBhlqC1Ru2R0EuX5ywlP45a9Pm01VP3mdImGZz2rqdP2deHhGaq'
}).addTo(this.map);

   

  
        // Make an HTTP request to retrieve the trips.
        /* const url = `${environment.apiUrl}/places`;
        this.http.get(url).subscribe((data) => {
          console.log(data); */
          
          /* this.propertyList = data.properties; */
        /* this.leafletMap(); */
      /* }),
      err => {
        // Set the error information to display in the template
        this.error = `An error occurred, the data could not be retrieved: Status: ${err.status}, Message: ${err.statusText}`;
      } */

      


  }

 myIcon = L.icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',

    iconSize:     [38, 40], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

  leafletMap(locationPoints:L.LatLngTuple[]) {
    for (const point of locationPoints) {
      L.marker(point, {icon: this.myIcon}).addTo(this.map)
    }
  }

  ionViewWillLeave() {
    //this.map.remove();
  }

  }
  

  /* ngOnInit() {
    this.map = L.map('map', {
      center: [46.947673, 7.395961],
      zoom: 25,
      renderer: L.canvas()
  })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // maxZoom: 12,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map)

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);


    
  }

} */
