import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {map} from 'rxjs/operators';
import{Observable, Subject} from 'rxjs';
import { LatLngTuple } from "leaflet";

@Injectable({providedIn:'root'})
export class PlaceMapService {

    //locationChanged = new Subject<LatLngTuple[]>();

    //list: string[];

    constructor(private http: HttpClient){}

    getMarkersbyTripId(id?:string){

       
        return this.http.get<any>(`${environment.apiUrl}/places`).pipe(map(resData =>{
            return resData.filter(place => place.tripId === id).map(place => place.location.coordinates)
        }));


        /* this.http.get<any>(`${environment.apiUrl}/places`).pipe(map(resData =>{
            return resData.map(place => place.location.coordinates)
        }))
        .subscribe(transformedData => {
            console.log(transformedData);
            this.locationChanged.next(transformedData);
        }); */
    }

    getPlacesbyTripId(id?:string){

       
        return this.http.get<any>(`${environment.apiUrl}/places`).pipe(map(resData =>{
            return resData.filter(place => place.tripId === id)
        }));


        /* this.http.get<any>(`${environment.apiUrl}/places`).pipe(map(resData =>{
            return resData.map(place => place.location.coordinates)
        }))
        .subscribe(transformedData => {
            console.log(transformedData);
            this.locationChanged.next(transformedData);
        }); */
    }
}