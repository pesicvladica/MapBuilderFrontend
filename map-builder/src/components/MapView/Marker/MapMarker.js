import { Feature } from "ol";
import { Point, Circle, GeometryCollection } from "ol/geom";
import { fromLonLat, toLonLat } from "ol/proj";

import { ComponentInstaller } from "./Components/Utilities/ComponentInstaller";
import { StyleComponent } from "./Styles/StyleComponent";

export class MapMarker extends Feature {
  static #nextMarkerId = 1;

  #latitude;
  #longitude;
  #radius;

  #hashedComponents;
  #componentInstaller;
  #styleComponent;

  constructor(longitude, latitude, radius = 50, style, isClone = false) {
    const coordinate = fromLonLat([longitude, latitude]);

    const point = new Point(coordinate);
    const circle = new Circle(coordinate, radius);
    const geometry = new GeometryCollection([point, circle]);

    super({ geometry });
    this.setId(MapMarker.#nextMarkerId++);

    this.#longitude = longitude;
    this.#latitude = latitude;
    this.#radius = radius;

    this.onInteractionListener = null;

    this.#hashedComponents = {};
    if (!isClone) {
      this.#componentInstaller = new ComponentInstaller(this);
      this.#componentInstaller.installComponents();
    }

    this.#styleComponent = style ?? new StyleComponent();
    this.#styleComponent.attach(this);
    this.#styleComponent.setDefaultStyle();
  }

  addComponent(key, component) {
    this.#hashedComponents[key] = component;
  }

  setInteractionListener(listener) {
    this.onInteractionListener = listener;
  }

  updateStyle() {
    this.#styleComponent.updateStyle();
  }

  getMarkerCoordinates() {
    const coords = this.getGeometry().getGeometries()[0].getCoordinates();
    const [lon, lat] = toLonLat(coords);
    this.#longitude = lon;
    this.#latitude = lat;
    return [this.#latitude, this.#longitude];
  }

  getMarkerRadius() {
    return this.#radius;
  }

  setMarkerRadius(radius) {
    this.#radius = radius;

    const collection = this.getGeometry();
    const [point, circle] = collection.getGeometries();
    circle.setRadius(this.#radius);
    collection.setGeometries([point, circle]);
  }

  clone() {
    const [lat, lon] = this.getMarkerCoordinates();
    const style = this.#styleComponent.clone();
    const clonedMarker = new MapMarker(lon, lat, this.#radius, style, true);
    for (const key in this.#hashedComponents) {
      const component = this.#hashedComponents[key].clone();
      component.attach(clonedMarker);
      clonedMarker.addComponent(key, component);
    }
    return clonedMarker;
  }

  dispose() {
    for (const key in this.#hashedComponents) {
      const component = this.#hashedComponents[key];
      if (component && typeof component.dispose === "function") {
        component.dispose();
      }
    }
    this.#hashedComponents = {};
    this.#componentInstaller = null;
    this.onInteractionListener = null;
    this.#styleComponent.dispose();
    super.dispose();
  }

  exportConfiguration() {
    const [lat, lon] = this.getMarkerCoordinates();
    let data = {
      id: this.getId(),
      location: {
        latitude: lat,
        longitude: lon,
      },
      radius: this.#radius,
    };

    for (const component of Object.values(this.#hashedComponents)) {
      const configurationData = component.exportConfiguration();
      if (Object.keys(configurationData).length !== 0) {
        data = { ...data, ...configurationData };
      }
    }

    return data;
  }

  trigger(event) {
    const { className, methodName, value } = event;
    const component = this.#hashedComponents[className];

    if (!component) return;
    if (typeof component[methodName] !== "function") return;

    return component[methodName](value);
  }
}
