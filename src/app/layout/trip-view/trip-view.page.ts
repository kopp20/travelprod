import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from '@ionic/angular';
import { TripListService } from '../trip-list/trip-list.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.page.html',
  styleUrls: ['./trip-view.page.scss'],
})
export class TripViewPage implements ViewDidEnter {
  id: any;
  tripData : Array<any>;
  placeData : Array<any>
  constructor(
    private route: ActivatedRoute,
    private router : Router,
    public http: HttpClient,
    private triplistservice : TripListService,
    private auth: AuthService,
    // TODO: inject the HTTP client.
  ) { 
    this.id = this.route.snapshot.paramMap.get('id'); 
    this.triplistservice.getTripView(this.id).subscribe(trip=>{
    this.tripData = trip;})

    this.triplistservice.getCurrentTrip(this.id).subscribe(places=>{
      this.placeData = places;})
  }


  ionViewDidEnter(): void {

  }
  ngOnInit() {}

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
}
