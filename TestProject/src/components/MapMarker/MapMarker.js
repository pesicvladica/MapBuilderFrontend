import blue from "./MarkerIconBlue.svg";
import red from "./MarkerIconRed.svg";

import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Style, Icon } from "ol/style";

const MapMarker = (longitude, latitude, selected) => {
  const marker = new Feature({
    geometry: new Point(fromLonLat([longitude, latitude])),
  });

  marker.setStyle(
    new Style({
      image: new Icon({
        src: selected ? red : blue,
        scale: 0.5,
      }),
    })
  );

  return marker;
};

export default MapMarker;
