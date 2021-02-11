import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { ImgurAlbumResponse } from 'src/app/models/imgur-album-response';
import { ImgurImageResponse } from 'src/app/models/imgur-image-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

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

  // Return array of url pointing every images of a given imgur album (pictureUrl)
  // album = pictureUrl (e.g. https://api.imgur.com/3/album/vCS6WsU)
  getAllPictures(album: string): Observable<string[]> {
    const url = `${album}/images`
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Client-ID ${environment.imgurId}`
      })
    }
    /* console.log("httpOptions", httpOptions)
    console.log("httpOptionsAuthorization", httpOptions.headers) */
    return this.http.get<any>(url, httpOptions).pipe(map(image => image.link))
  }

  async getFirstPicture(album: string): Promise<string> {
    let picture
    await this.getAllPictures(album).toPromise().then(pictures => {
      picture = pictures[0]
    }).catch(() => {
      picture = "https://i.imgur.com/ixhTOo3.png"
    })
    return picture
  }
}
