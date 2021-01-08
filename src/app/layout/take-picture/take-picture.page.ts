import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.page.html',
  styleUrls: ['./take-picture.page.scss'],
})
export class TakePicturePage implements OnInit {

  constructor(public photoService: PhotoService) { }


  ngOnInit() {
  }

}
