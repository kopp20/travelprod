import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from '@ionic/angular';
import { TripListService } from '../trip-list/trip-list.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ImgurService } from '../../services/imgur.service';
import { PlaceResponse } from '../../models/place-response';
import * as L from 'leaflet';
import { defaultIcon } from '../places-map/default-marker';

@Component({
  selector: 'app-place-view',
  templateUrl: './place-view.page.html',
  styleUrls: ['./place-view.page.scss'],
})
export class PlaceViewPage implements ViewDidEnter {
  id: any;
  placeData : any;
  constructor(
    private route: ActivatedRoute,
    private router : Router,
    public http: HttpClient,
    private triplistservice : TripListService,
    private auth: AuthService,
    public imgurService: ImgurService,
    // TODO: inject the HTTP client.
  ) {
    this.id = this.route.snapshot.paramMap.get('id'); 
    this.triplistservice.getPlaceView(this.id).subscribe(place=>{
    this.placeData = place;
    this.placeData.date = this.convertDate(place.createdAt)
    imgurService.getAllPictures(this.placeData.pictureUrl).subscribe(pics => {
      if(pics) {
        this.placeData['images'] = pics
      }
      else {
        this.placeData['images'] = [{link: "https://i.imgur.com/ixhTOo3.png"},{link: "https://i.imgur.com/IRXvGl5.jpg"}]
      }
    }, err => {
      this.placeData['images'] = [{link: "https://i.imgur.com/ixhTOo3.png"},{link: "https://i.imgur.com/IRXvGl5.jpg"}]
      console.log("image ",this.placeData.images)
    })

    let map = L.map('_mapId');
      map.setView(this.placeData.location.coordinates, 16);
      L.tileLayer(
        'https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=CLh9srebP4AGiZBhlqC1Ru2R0EuX5ywlP45a9Pm01VP3mdImGZz2rqdP2deHhGaq',
        {
          accessToken: 'CLh9srebP4AGiZBhlqC1Ru2R0EuX5ywlP45a9Pm01VP3mdImGZz2rqdP2deHhGaq'
          , maxZoom: 19
        }
      ).addTo(map);
      L.marker(this.placeData.location.coordinates, {icon : defaultIcon}).addTo(map);
    
  })
}

  ionViewDidEnter(): void {
  
  }


  ngOnInit() {
    

  }
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('.')
  }
}
