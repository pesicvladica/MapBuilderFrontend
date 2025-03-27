import activeMarker from "./LocationActive.svg";
import inactiveMarker from "./LocationInactive.svg";

import { Style, Icon, Stroke, Fill } from "ol/style";

export const normalMarker = (marker) => {
  const styles = [markerNormalStyle];
  if (marker.showRadius) {
    styles.push(circleNormalStyle);
  }
  return styles;
};

export const selectedMarker = (marker) => {
  const styles = [markerSelectedStyle];
  if (marker.showRadius) {
    styles.push(circleSelectedStyle);
  }
  return styles;
};

const markerNormalStyle = createIconStyle(inactiveMarker, 1);
const markerSelectedStyle = createIconStyle(activeMarker, 1.5);
function createIconStyle(icon, scale = 1) {
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

const circleNormalStyle = createCircleStyle("0, 0, 255");
const circleSelectedStyle = createCircleStyle("255, 0, 0");
function createCircleStyle(color) {
  return new Style({
    geometry: (marker) => {
      if (marker.showRadius) {
        return marker.getGeometry().getGeometries()[1];
      }
      return null;
    },
    stroke: new Stroke({ color: `rgba(${color})`, width: 2 }),
    fill: new Fill({ color: `rgba(${color}, 0.5)` }),
  });
}
