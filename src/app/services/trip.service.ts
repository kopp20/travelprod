import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TripResponse } from '../models/trip-response';
import { Trip } from '../models/trip';

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

  createTrip(body: Trip): Observable<TripResponse> {
    const url = `${environment.apiUrl}/trips`;
    return this.http.post<TripResponse>(url, body);
  }

  deleteTrip(trip: TripResponse): Observable<Object> {
    const url = `${environment.apiUrl}/trips/${trip.id}`;
    return this.http.delete(url);
  }
}
