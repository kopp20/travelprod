import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {map} from 'rxjs/operators';
import{Observable, Subject} from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { TripResponse } from '../../models/trip-response';
import { PlaceResponse } from '../../models/place-response';


@Injectable({providedIn:'root'})
export class TripListService {

    constructor(private http: HttpClient, private authService: AuthService){}

    getCurrentUserTrips(): Observable<TripResponse[]> {
        //Retrieve user id
        let userId: string;
        this.authService.getUserId().subscribe(id => {
          userId = id;
        }, err => {
          console.warn('Could not get user id', err);
        });
        // Make an HTTP request to retrieve the trips.
        const url = `${environment.apiUrl}/trips?user=${userId}`;
        console.log(url)
        return this.http.get<TripResponse[]>(url); 
  }

  getCurrentTrip(tripId): Observable<PlaceResponse[]> {
    const url = `${environment.apiUrl}/places?trip=${tripId}`;
    console.log(url)
    return this.http.get<PlaceResponse[]>(url); 
  }
  getCurrentTripname(tripId): Observable<TripResponse[]> {
    const url = `${environment.apiUrl}/trips/${tripId}`;
    console.log(url)
    return this.http.get<TripResponse[]>(url); 
  }

  getsearchTrip(tripname): Observable<TripResponse[]> {
    const url = `${environment.apiUrl}/trips?title=${tripname}`;
    console.log(url)
    return this.http.get<TripResponse[]>(url); 
  }

  getPlaceView(placepId): Observable<PlaceResponse[]> {
    const url = `${environment.apiUrl}/places/${placepId}`;
    console.log(url)
    return this.http.get<PlaceResponse[]>(url); 
  }



  
}