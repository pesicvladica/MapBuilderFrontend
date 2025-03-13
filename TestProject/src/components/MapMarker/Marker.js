import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Icon } from "ol/style";

import "./Marker.css";

const Marker = ({ longitude, latitude, selected }) => {
  const marker = new Feature({
    geometry: new Point([longitude, latitude]),
  });

  marker.setStyle(
    new Style({
      image: new Icon({
        src: selected
          ? "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg" // Red when selected
          : "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg", // Blue when unselected
        scale: 0.05,
      }),
    })
  );

  return marker;
};

export default Marker;
