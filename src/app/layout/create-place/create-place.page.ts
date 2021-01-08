import { Component, OnInit } from '@angular/core';
import { TripResponse } from 'src/app/models/trip-response';
import { PhotoService } from '../../services/photo.service';
import { PlaceService } from '../../services/place.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
})
export class CreatePlacePage implements OnInit {
  trip: string = ""
  trips: TripResponse[] = []

  constructor(public photoService: PhotoService, public placeService: PlaceService, public tripService: TripService) {
    tripService.getCurrentUserTrips().subscribe(trips => {
      this.trips.push(...trips);
    })
  }

  ngOnInit() {
  }

  createPlace() {
    /* let jwtToken: string;
    this.authService.getToken().subscribe(token => {
      jwtToken = "Bearer "+token;
      console.log(token)
    }, err => {
      console.warn('Could not get jwt token', err);
    }); */
    const body = {
      name: "Les poubelles jaunes",
      description: "Pour les briques de lait",
      location: {
        type: "Point",
        coordinates: [ 120.5412, -48.1850159 ],
      },
      tripHref: "/api/trips/f26081f6-28b7-4eae-b0c1-e32bd70d2e99",
      tripId: "f26081f6-28b7-4eae-b0c1-e32bd70d2e99",
      pictureUrl: "https://www.annemasse-agglo.fr/sites/default/files/inline-images/DECHETS_2017_BacsJaunes_AnnemasseAgglo.jpg"
    }

    this.placeService.createPlace(/* jwtToken,  */body).subscribe(place => {
      console.log(place);
    }, err => {
      console.warn('Could not create palce', err);
    })
  }

}
