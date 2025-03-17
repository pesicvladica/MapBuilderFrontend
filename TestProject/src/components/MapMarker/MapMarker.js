import blue from "./MarkerIconBlue.svg";
import red from "./MarkerIconRed.svg";

import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Style, Icon } from "ol/style";

export const MapMarker = (longitude, latitude) => {
  const marker = new Feature({
    geometry: new Point(fromLonLat([longitude, latitude])),
  });
  marker.setStyle(NormalMarkerStyle);
  return marker;
};

export const NormalMarkerStyle = new Style({
  image: new Icon({
    src: blue,
    scale: 1,
  }),
});

export const SelectedMarkerStyle = new Style({
  image: new Icon({
    src: red,
    scale: 2,
  }),
});
