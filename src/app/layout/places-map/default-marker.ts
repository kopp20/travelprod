import { Icon, IconOptions, icon } from 'leaflet';
export const defaultIcon: Icon<IconOptions> = icon({
  // This define the displayed icon size, in pixel
  iconSize: [ 25, 25 ],
  // This defines the pixel that should be placed right above the location
  // If not provided, the image center will be used, and that could be awkward
  iconAnchor: [ 10, 15 ],
  // The path to the image to display. In this case, it's a Leaflet asset
  iconUrl: 'https://saiykoh.com/a/icon.png'
  // The path to the image's shadow to display. Also a leaflet asset

});