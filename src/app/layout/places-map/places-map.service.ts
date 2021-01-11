import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {map} from 'rxjs/operators';
import{Subject} from 'rxjs';
import { LatLngTuple } from "leaflet";

@Injectable({providedIn:'root'})
export class PlaceMapService {

    locationChanged = new Subject<LatLngTuple[]>();

    list: string[];

    constructor(private http: HttpClient){}

    fetchPlaces(){
        this.http.get<any>(`${environment.apiUrl}/places`).pipe(map(resData =>{
            return resData.map(place => place.location.coordinates)
        }))
        .subscribe(transformedData => {
            console.log(transformedData);
            this.locationChanged.next(transformedData);
        });
    }
}