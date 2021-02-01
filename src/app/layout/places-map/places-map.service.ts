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

       
        return this.http.get<any>(`https://kasslaprod-travel-log.herokuapp.com/api/places`).pipe(map(resData =>{
            return resData.filter(place => place.tripId === id).map(place => place.location.coordinates)
        }));


       
    }

    getPlacesbyTripId(id?:string){

       
        return this.http.get<any>(`https://kasslaprod-travel-log.herokuapp.com/api/places`).pipe(map(resData =>{
            return resData.filter(place => place.tripId === id)
        }));


     
    }

    getTripByTripHref(href?:string){

       
        return this.http.get<any>(`https://kasslaprod-travel-log.herokuapp.com${href}`);


        
    }
}