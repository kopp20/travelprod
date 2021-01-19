import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { TripResponse } from 'src/app/models/trip-response';
import { Place } from 'src/app/models/place';
import { ImgurAlbum } from 'src/app/models/imgur-album';
import { ImgurAlbumResponse } from 'src/app/models/imgur-album-response';
import { PhotoService } from '../../services/photo.service';
import { PlaceService } from '../../services/place.service';
import { TripService } from '../../services/trip.service';
import { ImgurService } from '../../services/imgur.service';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
})
export class CreatePlacePage implements OnInit {
  /* Form fields */
  trip: number = 0 //key corresponding to the selected trip in trips array. blank if new trip
  newTripName: string
  newTripDesc: string
  title: string
  currentLocation: Object
  
  description: string
  errors: string[] = []

  trips: (TripResponse)[]= [{title: "+ Nouveau voyage", href:"", id:"", description:"", placesCount: 0, userHref:"", userId: "", createdAt: new Date(0), updatedAt: new Date(0)}]

  constructor(public photoService: PhotoService, public placeService: PlaceService, public tripService: TripService, public imgurService: ImgurService) {
    // Fetch user's trips and add them to the trips dropdown
    tripService.getCurrentUserTrips().subscribe(trips => {
      this.trips.push(...trips)
    }, err => console.error(err))

    Geolocation.getCurrentPosition().then(coord => {
      this.currentLocation = {
        type: "Point",
        coordinates: [ coord.coords.latitude, coord.coords.longitude]
      }
      console.log(this.currentLocation)
    }).catch(err => console.error(err));
  }

  ngOnInit() {
  }

  async createPlace() {
    this.errors = []

    // Retrieve the newly created imgur album
    let newImgurAlbum:ImgurAlbum
    await this.imgurUpload().then(album => {
      newImgurAlbum = album
    }).catch(err => console.error(err))

    if(this.trip == 0) {
      // Retrieve the newly created trip and add it to the trips array
      let newTrip: TripResponse
      await this.tripService.createTrip({
        title: this.newTripName,
        description: this.newTripDesc
      }).toPromise().then(trip => {
        newTrip = trip
      }).catch(err => {
        for(let elem in err.error.errors) {
          this.errors.push(err.error.errors[elem].message)
        }
      })
      this.trips.push(newTrip)
      this.trip = this.trips.length -1
    }

    let newPlace: Place = {
      name: this.title,
      description: this.description,
      location: this.currentLocation,
      tripHref: this.trips[this.trip].href,
      tripId: this.trips[this.trip].id,
      pictureUrl: `https://api.imgur.com/3/album/${newImgurAlbum.id}`
    }

    this.placeService.createPlace(newPlace).subscribe((place) => {
      console.log("SUCCESS", place);
    }, (err) => {
      for(let elem in err.error.errors) {
        this.errors.push(err.error.errors[elem].message)
      }
    })
  }

  imgurUpload(): Promise<ImgurAlbum> {
    // Creation of the imgur album
    return new Promise ((resolve, reject) => {
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
            resolve(album.data)
          }, err => {
            reject("Could not add the images to imgur")
          })
        })
      }, err => {
        reject("Could not create an imgur album")
      })
    })
  }

  openCamera() {
    this.photoService.takePicture();
  }
}
