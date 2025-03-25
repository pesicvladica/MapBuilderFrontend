import blue from "./MarkerIconBlue.svg";
import red from "./MarkerIconRed.svg";

import {
  DeleteInteraction,
  DeselectInteraction,
  SelectInteraction,
} from "./MarkerInteraction";

import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat, toLonLat } from "ol/proj";
import { Style, Icon } from "ol/style";

import Circle from "ol/geom/Circle.js";
import GeometryCollection from "ol/geom/GeometryCollection";

let nextMarkerId = 1;

export class CustomMarker extends Feature {
  constructor(longitude, latitude) {
    const coordinate = fromLonLat([longitude, latitude]);
    const defaultRadius = 0;

    const point = new Point(coordinate);
    const circle = new Circle(coordinate, defaultRadius);
    const geometry = new GeometryCollection([point, circle]);

    super({ geometry: geometry });
    this.setId(nextMarkerId++);
    this.setStyle(NormalMarkerStyle);

    this.longitude = longitude;
    this.latitude = latitude;

    this.radius = defaultRadius;
    this.selected = false;
  }

  setInteractionListener(listener) {
    this.onInteractionListener = listener;
  }

  getCoordinates() {
    return [this.longitude, this.latitude];
  }

  setCoordinates(coordinates) {
    const [lon, lat] = toLonLat(coordinates);
    this.longitude = lon;
    this.latitude = lat;

    const collection = this.getGeometry();

    const geometries = collection.getGeometries();
    const point = geometries[0];
    const circle = geometries[1];

    point.setCoordinates(coordinates);
    circle.setCenter(coordinates);

    collection.setGeometries([point, circle]);
  }

  select() {
    this.selected = true;

    this.setStyle(SelectedMarkerStyle);
    if (this.onInteractionListener) {
      this.onInteractionListener(new SelectInteraction(this));
    }
  }

  deselect() {
    this.selected = false;

    this.setStyle(NormalMarkerStyle);
    if (this.onInteractionListener) {
      this.onInteractionListener(new DeselectInteraction(this));
    }
  }

  getRadius() {
    return this.radius;
  }

  setRadius(radius) {
    this.radius = radius;
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
