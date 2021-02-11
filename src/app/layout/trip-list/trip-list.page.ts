import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { TripListService } from './trip-list.service';
import { ImgurService } from '../../services/imgur.service';
import { TripService } from '../../services/trip.service';
import { TripListPageModule } from './trip-list.module';
import { title } from 'process';
import { map } from 'rxjs/operators';
import { viewClassName } from '@angular/compiler';



@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
})
export class TripListPage implements ViewDidEnter {

  tripData : Array<any> = []
  placeData : Array<any> = []
  tripName : any
  searchTitle : any

  constructor(
    private auth: AuthService,
    // TODO: inject the HTTP client.
    public http: HttpClient,
        // Inject the router
    private router: Router,
    
    private triplistservice : TripListService ,
    public imgurService: ImgurService,
    public tripService: TripService
  ) {
    triplistservice.getCurrentUserTrips().subscribe(trips => {
      trips.forEach(async trip => {
        trip['image'] = await this.tripService.getFirstImage(trip.id)
        trip['date'] = this.convertDate(trip.createdAt);
        this.tripData.push(trip)
      });
      /* this.tripData = trips; */
      console.log(this.tripData)
    })
    
    

  }

  ionViewDidEnter(): void {

  }
  
  showPlaces(tripId){
    this.triplistservice.getCurrentTrip(tripId).subscribe(places=>{
      this.placeData = []
      places.forEach(async place => {
        place['image'] = await this.tripService.getFirstImage(place.id)
        place['date'] = this.convertDate(place.createdAt)
        this.placeData.push(place)
        console.log(this.placeData)
      });
      
    })
  }

  searchTrip(){
    this.searchTitle
    this.tripData=[];
    this.triplistservice.getsearchTrip(this.searchTitle).subscribe(async trip=>{
      trip.forEach(async trip => {
        trip['image'] = await this.tripService.getFirstImage(trip.id)
        this.tripData.push(trip)
      });
    })
  }

  ngOnInit() {
  }

  goPageView(placeId){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/place-view', placeId]));
    //this.router.navigateByUrl(`/place-view/${placeId}`);
    /*this.router.navigate([`place-view/${placeId}`])*/
  }

  goPageViewTrip(tripId){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/places-map', tripId]));
    //this.router.navigateByUrl(`/places-map/${tripId}`);
    /*this.router.navigate([`trip-view/${tripId}`])*/
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
