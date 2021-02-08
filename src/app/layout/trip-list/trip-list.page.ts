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
  placeData : Array<any>
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
      this.placeData = places;
    })
    this.triplistservice.getCurrentTripname(tripId).subscribe(trip=>{
      this.tripName = trip;
    })
  }

  searchTrip(){
    this.searchTitle
    this.triplistservice.getsearchTrip(this.searchTitle).subscribe(trip=>{
      this.tripData = trip;
    })
  }

  ngOnInit() {
  }

  goPageView(placeId){
    this.router.navigateByUrl(`/place-view/${placeId}`);
    /*this.router.navigate([`place-view/${placeId}`])*/
  }

  goPageViewTrip(tripId){
    
    this.router.navigateByUrl(`/places-map/${tripId}`);
    /*this.router.navigate([`trip-view/${tripId}`])*/
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
}
