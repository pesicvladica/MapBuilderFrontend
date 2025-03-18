import blue from "./MarkerIconBlue.svg";
import red from "./MarkerIconRed.svg";

import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Style, Icon } from "ol/style";

let nextMarkerId = 1;

export class CustomMarker extends Feature {

  constructor(longitude, latitude, onDeleteListener) {
    super({
      geometry: new Point(fromLonLat([longitude, latitude])),
    });
    this.setId(nextMarkerId ++);
    this.setStyle(NormalMarkerStyle);

    this.longitude = longitude;
    this.latitude = latitude;

    this.onDeleteListener = onDeleteListener;
  }

  setSelected(isSelected) {
    if (isSelected) {
      this.setStyle(SelectedMarkerStyle);
    } else {
      this.setStyle(NormalMarkerStyle);
    }
  }

  delete() {
    if (this.onDeleteListener) {
      this.onDeleteListener(this);
    }
  }

  isEqualTo({latitude, longitude}) {
    return this.longitude === longitude && this.latitude === latitude;
  } 
}

const NormalMarkerStyle = new Style({
  image: new Icon({
    src: blue,
    scale: 1,
  }),
});

const SelectedMarkerStyle = new Style({
  image: new Icon({
    src: red,
    scale: 2,
  }),
});
