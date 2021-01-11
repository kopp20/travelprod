import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { Observable, of } from 'rxjs';
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';



@Injectable({

 providedIn: 'root'

})

export class Usercreate {



constructor(private http: HttpClient) {
  
}

  createUser(body: User): Observable<User> {

  const url = `${environment.apiUrl}/users`;

  return this.http.post<AuthResponse>(url, body);

 }
}