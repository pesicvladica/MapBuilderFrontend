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

/**
 * Initialization
 */
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

    this.title = options.title ?? "Location marker";

    this.longitude = longitude;
    this.latitude = latitude;

    this.selected = false;

    this.showRadius = options.showRadius ?? true;
    this.radius = defaultRadius;
    this.minRadius = options.minRadius ?? 10;
    this.maxRadius = options.maxRadius ?? 100;

    this.onInteractionListener = null;
    this.setStyle(normalMarker(this));
  }

  // MARK: - Private methods

  #updateRadius() {
    const collection = this.getGeometry();

    const [point, circle] = collection.getGeometries();
    circle.setRadius(this.showRadius ? this.radius : 0);

    collection.setGeometries([point, circle]);

    this.setStyle(this.selected ? selectedMarker(this) : normalMarker(this));
  }

  // MARK: - Public methods

  setInteractionListener(listener) {
    this.onInteractionListener = listener;
  }

  delete() {
    if (this.onInteractionListener) {
      this.onInteractionListener(new DeleteInteraction(this));
    }
  }

  // Expects map event coordinates
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

  setRadius(radius) {
    this.radius = radius;
    this.#updateRadius();
  }

  setShowRadius(show) {
    if (show === this.showRadius) {
      return;
    }
    this.showRadius = show;
    this.#updateRadius();
  }
}
