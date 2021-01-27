import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { TripListService } from './trip-list.service';
import { TripListPageModule } from './trip-list.module';
import { title } from 'process';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
})
export class TripListPage implements ViewDidEnter {
  constructor(
    private auth: AuthService,
    // TODO: inject the HTTP client.
    public http: HttpClient,
        // Inject the router
    private router: Router,
    
    private triplistservice : TripListService 
  ) {}
  

  tripData : Array<any>;

  ionViewDidEnter(): void {

    // Make an HTTP request to retrieve the trips.
    const url = `${environment.apiUrl}/trips?user=${userId}`;
    this.http.get(url).subscribe((trips) => {
      console.log(`Trips loaded`, trips);
      this.tripData = trips ;

      console.log(this.tripData)
    })
  }

  ngOnInit() {
  }
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
}
