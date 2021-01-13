import { Component, OnInit } from '@angular/core';
import { TripResponse } from 'src/app/models/trip-response';
import { Place } from 'src/app/models/place';
import { ImgurAlbumResponse } from 'src/app/models/imgur-album-response';
import { PhotoService } from '../../services/photo.service';
import { PlaceService } from '../../services/place.service';
import { TripService } from '../../services/trip.service';
import { ImgurService } from '../../services/imgur.service';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
})
export class CreatePlacePage implements OnInit {
  trip: string = ""
  trips: TripResponse[] = []
  newPlace: Place

  constructor(public photoService: PhotoService, public placeService: PlaceService, public tripService: TripService, public imgurService: ImgurService) {
    // Fetch user's trips and add them to the trips dropdown
    tripService.getCurrentUserTrips().subscribe(trips => {
      this.trips.push(...trips);
    })
  }

  ngOnInit() {
  }

  createPlace() {
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

  imgurUpload() {
    // Creation of the imgur album
    this.imgurService.createAlbum().subscribe(album => {
      console.log("created album: "+JSON.stringify(album))
      // Creation of the imgur images directly inside the previously created album
      this.photoService.photos.forEach(async photo => {
        // Firtly, convert the blob image to a base64 (jpeg) file
        let image = await this.photoService.readAsBase64(photo)
        image = image.split(",").pop()
        // Then, add it to the album
        this.imgurService.addPictureToAlbum(image, album.data.deletehash).subscribe(pic => {
          // If everything went well, return the album {id, deletehash}
          return album.data
        }, err => {
          console.error("Could not add the images to imgur")
        })
      })
    }, err => {
      console.error("Could not create an imgur album")
    })
  }
}
