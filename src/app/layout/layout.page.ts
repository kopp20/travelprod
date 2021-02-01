import { Component } from "@angular/core";
import { PhotoService } from '../services/photo.service';

// Interface that represent a tab data.
/* export interface PageTab {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
} */

@Component({
  selector: "app-layout",
  templateUrl: "layout.page.html",
  styleUrls: ["layout.page.scss"],
})
export class LayoutPage {
  //tabs: PageTab[];

  constructor(public photoService: PhotoService) {
    /* this.tabs = [
      { title: "New Trip", icon: "add", path: "create-trip" },
      { title: "Take pic", icon: "map", path: "take-picture" },
      { title: "Create Place", icon: "add", path: "create-place" },
    ]; */
  }
  
  openCamera() {
    this.photoService.emptyPhotos();
    this.photoService.takePicture();
  }
}