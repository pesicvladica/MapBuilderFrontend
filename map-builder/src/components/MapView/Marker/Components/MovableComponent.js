import { BaseComponent } from "./Utilities/BaseComponent";

export class MovableComponent extends BaseComponent {
  getMapEventCoordinates() {
    if (!this.marker) return;

    const collection = this.marker.getGeometry();
    const point = collection.getGeometries()[0];
    return point.coordinates;
  }

  setMapEventCoordinates(coordinates) {
    if (!this.marker) return;

    const collection = this.marker.getGeometry();
    const [point, circle] = collection.getGeometries();
    point.setCoordinates(coordinates);
    circle.setCenter(coordinates);
    collection.setGeometries([point, circle]);
  }

  clone() {
    return new MovableComponent();
  }
}
