import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import * as L from 'leaflet';
import { HttpClient } from "@angular/common/http";



import { PlaceMapService } from './places-map.service';

import { latLng, MapOptions, tileLayer, marker, Marker, Polyline, polyline } from 'leaflet';

import { defaultIcon } from './default-marker';


@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.page.html',
  styleUrls: ['./places-map.page.scss'],
})
export class PlacesMapPage implements OnInit, OnDestroy {
  mapMarkers: any[] = new Array();
  mapOptions: MapOptions;
  myPlaces: any[] = new Array();
  markerList: any[] = new Array();
  map: L.Map;
  markerId: any;



  constructor(
    private plcMapService: PlaceMapService,
    private route: ActivatedRoute,
    public http: HttpClient,
    ) {
      this.markerId = this.route.snapshot.paramMap.get('id'); 
    this.mapOptions = {
      layers: [
        tileLayer(
          'https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=CLh9srebP4AGiZBhlqC1Ru2R0EuX5ywlP45a9Pm01VP3mdImGZz2rqdP2deHhGaq',
          {
            accessToken: 'CLh9srebP4AGiZBhlqC1Ru2R0EuX5ywlP45a9Pm01VP3mdImGZz2rqdP2deHhGaq'
            , maxZoom: 19,
            keepBuffer: 30
          }
        )
      ],
      zoom: 15,
      center: latLng(48.223501983181386, 10.101661193713882)
    };
  }



  onMapReady(map: L.Map) {
    this.map = map;
    map.createPane('fixed', document.getElementById('mapid'));
    setTimeout(() => map.invalidateSize(), 0);

  }



  ngOnInit() {
    this.plcMapService.getPlacesbyTripId(this.markerId).subscribe(result => {
      this.leafletMarkers(result);
      this.myPlaces = result
    })

    this.plcMapService.getMarkersbyTripId(this.markerId).subscribe(result => {
      this.leafletLines(result);
      this.map.flyTo(result[0], 18)
    })
  }

  ngOnDestroy() {
  }

  ionViewDidEnter() {

  }

  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('.')
  }
  

  leafletMarkers(places: Array<any>) {
    document.addEventListener("click", e => {
      let element = <HTMLTextAreaElement>e.target
      let map1 = this.myPlaces.map(place => place.name)
      let myIndex = map1.indexOf(element.innerText);

      if (element.classList.contains("before") || element.classList.contains("after")) {

        this.markerList[myIndex].fire('click')
      }
    });

    for (const place of places) {
      let i = places.indexOf(place);
      let before = places[i - 1];
      let after = places[i + 1];
      let markerTest = marker(place.location.coordinates, { icon: defaultIcon });
      this.mapMarkers.push(markerTest);
      this.markerList.push(markerTest);
      let popup = L.popup({
        pane: 'fixed',
        className: 'popup-fixed',
        autoPan: true,
        autoPanPaddingTopLeft: [0, 50],
        autoPanPaddingBottomRight: [300, 500],
      })

      markerTest.bindPopup(popup);

      this.plcMapService.getTripByTripHref(place.tripHref).subscribe(result => {
        let date = new Date(result.createdAt);
        let newDate = this.convertDate(date);
        let content = `<div class="_wrapper"><div class="_content-top"><div class="_top-left"><div class="_img"><img src="${place.pictureUrl}" ></div><div class="_titre"><h4>${place.description}</h4>
        <p>${result.title}</p><p>${newDate}</p></div></div><div class="top-right"><p class="_voir">voir</p></div></div><div class="_content-bottom">`;


        (before) ? content += `<div class="before_wrapper"><p>étape précédente</p><div class="before"><img src="${before.pictureUrl}" ><p>${before.name}</p></div></div>` : content += `<div class="before_wrapper"><p>étape précédente</p><div><p></p></div></div>`;
        (after) ? content += `<div class="after_wrapper"><p>étape suivante</p><div class="after"><img src="${after.pictureUrl}" ><p>${after.name}</p></div></div>` : content += `<div class="after_wrapper"><p>étape suivante</p><div><p></p></div></div>`;

        content += `</div>`;

        popup.setContent(content);
      })
    }
  }

  leafletLines(pointList: L.LatLng[][]) {
    this.mapMarkers.push(polyline(pointList, {
      color: 'violet',
      weight: 3,
      opacity: 0.5,
      smoothFactor: 3
    }));
  }

  ionViewWillLeave() {
  }
}

