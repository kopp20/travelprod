import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {map} from 'rxjs/operators';
import{Observable, Subject} from 'rxjs';


@Injectable({providedIn:'root'})
export class TripListService {

    constructor(private http: HttpClient){}

    
}