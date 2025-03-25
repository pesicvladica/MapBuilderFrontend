import { 
  normalMarker, 
  selectedMarker 
} from "./CustomMarkerStyles";

import {
  DeleteInteraction,
  DeselectInteraction,
  SelectInteraction,
} from "./MarkerInteraction";

import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat, toLonLat } from "ol/proj";

import Circle from "ol/geom/Circle.js";
import GeometryCollection from "ol/geom/GeometryCollection";

export class CustomMarker extends Feature {
  static nextMarkerId = 1;

  constructor(longitude, latitude, options = {}) {
    const coordinate = fromLonLat([longitude, latitude]);
    const defaultRadius = options.radius ?? 50;

    const point = new Point(coordinate);
    const circle = new Circle(coordinate, defaultRadius);
    const geometry = new GeometryCollection([point, circle]);

    super({ geometry });
    this.setId(CustomMarker.nextMarkerId++);

    this.longitude = longitude;
    this.latitude = latitude;

    this.radius = defaultRadius;
    this.selected = false;
    this.showCircle = true;
    this.onInteractionListener = null;

    this.setStyle(normalMarker(this));
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

    const [point, circle] = collection.getGeometries();
    point.setCoordinates(coordinates);
    circle.setCenter(coordinates);

    collection.setGeometries([point, circle]);
  }

  select() {
    if (this.selected) {
      return;
    }

    this.selected = true;
    this.setStyle(selectedMarker(this));

    if (this.onInteractionListener) {
      this.onInteractionListener(new SelectInteraction(this));
    }
  }

  deselect() {
    if (!this.selected) {
      return;
    }

    this.selected = false;
    this.setStyle(normalMarker(this));

    if (this.onInteractionListener) {
      this.onInteractionListener(new DeselectInteraction(this));
    }
  }

  delete() {
    if (this.onInteractionListener) {
      this.onInteractionListener(new DeleteInteraction(this));
    }
  }

  getRadius() {
    return this.radius;
  }

  setRadius(radius) {
    this.radius = radius;
    this._updateRadius();
  }

  toggleCircleVisibility() {
    this.showCircle = !this.showCircle;
    this._updateRadius();
  }

  _updateRadius() {
    const collection = this.getGeometry();

    const [point, circle] = collection.getGeometries();
    circle.setRadius(this.showCircle ? this.radius : 0);

    collection.setGeometries([point, circle]);
  }
}
