import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
})
export class TripListPage implements ViewDidEnter {
  constructor(
    private auth: AuthService,
    // TODO: inject the HTTP client.
    public http: HttpClient
  ) {}

  ionViewDidEnter(): void {
    // Make an HTTP request to retrieve the trips.
    const url = `${environment.apiUrl}/trips`;
    this.http.get(url).subscribe((trips) => {
      console.log(`Trips loaded`, trips);
    });
  }

  ngOnInit() {
  }

}
