import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TripResponse } from '../models/trip-response';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient, private authService: AuthService ) { }

  getCurrentUserTrips(): Observable<TripResponse[]> {
    //Retrieve user id
    let userId: string;
    this.authService.getUserId().subscribe(id => {
      userId = id;
      console.log(id)
    }, err => {
      console.warn('Could not get user id', err);
    });
    // Make an HTTP request to retrieve the trips.
    const url = `${environment.apiUrl}/trips?user=${userId}`;
    return this.http.get<TripResponse[]>(url)/* .subscribe((trips) => {
      console.log(`Trips loaded : `, trips);
      //return trips
    }); */
  }
}
