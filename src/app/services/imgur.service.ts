import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { ImgurAlbumResponse } from 'src/app/models/imgur-album-response';
import { ImgurImageResponse } from 'src/app/models/imgur-image-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgurService {

  constructor(private http: HttpClient) {}

  createAlbum(): Observable<ImgurAlbumResponse> {
    const url = `${environment.imgurApiUrl}/album`;
    const body = {}
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Client-ID ${environment.imgurId}`
      })
    }
    return this.http.post<ImgurAlbumResponse>(url, body, httpOptions);
  }

  addPictureToAlbum(picture: string, albumId: string): Observable<ImgurImageResponse> {
    const url = `${environment.imgurApiUrl}/image`;
    const body = {
      image: picture,
      type: "base64",
      album: albumId
    }
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Client-ID ${environment.imgurId}`
      })
    }
    return this.http.post<ImgurImageResponse>(url, body, httpOptions);
  }
}
