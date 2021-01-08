import { Injectable } from '@angular/core';
import { Place } from '../models/place';
import { PlaceResponse } from '../models/place-response';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {

  }

  createPlace(/* token: string,  */body: Place): Observable<Place> {
    const url = `${environment.apiUrl}/places`;
    /* const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    } */
    return this.http.post<PlaceResponse>(url, body/* , httpOptions */);
  }
}
