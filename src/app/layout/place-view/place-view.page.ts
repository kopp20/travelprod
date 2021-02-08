import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from '@ionic/angular';
import { TripListService } from '../trip-list/trip-list.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ImgurService } from '../../services/imgur.service';
import { PlaceResponse } from '../../models/place-response';


@Component({
  selector: 'app-place-view',
  templateUrl: './place-view.page.html',
  styleUrls: ['./place-view.page.scss'],
})
export class PlaceViewPage implements ViewDidEnter {
  id: any;
  placeData : PlaceResponse;
  constructor(
    private route: ActivatedRoute,
    private router : Router,
    public http: HttpClient,
    private triplistservice : TripListService,
    private auth: AuthService,
    public imgurService: ImgurService,
    // TODO: inject the HTTP client.
  ) {
    this.id = this.route.snapshot.paramMap.get('id'); 
    this.triplistservice.getPlaceView(this.id).subscribe(place=>{
    this.placeData = place;
    imgurService.getAllPictures(this.placeData.pictureUrl).subscribe(pics => {
      if(pics) {
        this.placeData['images'] = pics
      }
      else {
        this.placeData['images'] = [{link: "https://i.imgur.com/ixhTOo3.png"},{link: "https://i.imgur.com/IRXvGl5.jpg"}]
      }
      console.log(this.placeData.images)
    }, err => {
      console.log("error")
      this.placeData['images'] = [{link: "https://i.imgur.com/ixhTOo3.png"},{link: "https://i.imgur.com/IRXvGl5.jpg"}]
    })
  })
}

  ionViewDidEnter(): void {

  }


  ngOnInit() {

  }
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

}
