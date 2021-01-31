import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from '@ionic/angular';
import { TripListService } from '../../trip-list/trip-list.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  id: any;
  placeData : Array<any>;
  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
    private triplistservice : TripListService
  ) {}
  
  ionViewDidEnter(): void {

  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id'); 
    this.triplistservice.getPlaceView(this.id).subscribe(place=>{
    this.placeData = place;
    console.log(this.placeData)
  })
   console.log(this.id);
  }
}
