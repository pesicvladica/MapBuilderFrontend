import blue from "./MarkerIconBlue.svg";
import red from "./MarkerIconRed.svg";

import {
  DeleteInteraction,
  DeselectInteraction,
  SelectInteraction,
} from "./MarkerInteraction";

import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Style, Icon } from "ol/style";

let nextMarkerId = 1;

export class CustomMarker extends Feature {
  constructor(longitude, latitude, onInteractionListener) {
    super({
      geometry: new Point(fromLonLat([longitude, latitude])),
    });
    this.setId(nextMarkerId++);
    this.setStyle(NormalMarkerStyle);

    this.longitude = longitude;
    this.latitude = latitude;

    this.onInteractionListener = onInteractionListener;
  }

  select() {
    this.setStyle(SelectedMarkerStyle);
    if (this.onInteractionListener) {
      this.onInteractionListener(new SelectInteraction(this));
    }
  }

  deselect() {
    this.setStyle(NormalMarkerStyle);
    if (this.onInteractionListener) {
      this.onInteractionListener(new DeselectInteraction(this));
    }
  }

  delete() {
    if (this.onInteractionListener) {
      this.onInteractionListener(new DeleteInteraction(this));
    }
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
