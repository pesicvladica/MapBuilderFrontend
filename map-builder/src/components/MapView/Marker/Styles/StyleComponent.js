import { BaseComponent } from "../Components/Utilities/BaseComponent";
import { MarkerComponentEvents } from "../MarkerComponentEvents";
import { Pin } from "./PinGraphic";

import { Style, Icon, Stroke, Fill } from "ol/style";

export class StyleComponent extends BaseComponent {
  #createIconStyle(icon, scale = 1) {
    return new Style({
      image: new Icon({
        src: icon,
        width: 24 * scale,
        height: 24 * scale,
        anchor: [0.5, 1],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
      }),
    });
  }

  #createCircleStyle(color) {
    return new Style({
      geometry: (marker) => {
        return marker.getGeometry().getGeometries()[1];
      },
      stroke: new Stroke({ color: `rgba(${color})`, width: 2 }),
      fill: new Fill({ color: `rgba(${color}, 0.5)` }),
    });
  }

  #createTransparentCircleStyle() {
    return new Style({
      geometry: (marker) => {
        return marker.getGeometry().getGeometries()[1];
      },
      stroke: new Stroke({ color: `rgba(0,0,0,0)`, width: 2 }),
      fill: new Fill({ color: `rgba(0,0,0,0)` }),
    });
  }

  setDefaultStyle() {
    if (!this.marker) return;

    const normalPin = Pin.normal;
    const iconStyle = this.#createIconStyle(normalPin);
    const circleStyle = this.#createCircleStyle("0,0,255");

    this.marker.setStyle([iconStyle, circleStyle]);
  }

  updateStyle() {
    if (!this.marker) return;

    const normalPin = Pin.normal;
    const selectedPin = Pin.selected;

    const isSelected = this.marker.trigger(
      MarkerComponentEvents.SelectableComponent().isSelected()
    );
    const showRadius = this.marker.trigger(
      MarkerComponentEvents.RadiusComponent().getShowRadius()
    );

    const iconStyle = this.#createIconStyle(
      !isSelected ? normalPin : selectedPin
    );
    const styles = [iconStyle];
    if (showRadius) {
      const circleStyle = this.#createCircleStyle(
        !isSelected ? "0,0,255" : "255,0,0"
      );
      styles.push(circleStyle);
    } else {
      const circleStyle = this.#createTransparentCircleStyle();
      styles.push(circleStyle);
    }
    this.marker.setStyle(styles);
  }
}
