import { useEffect, useRef } from "react";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { fromLonLat } from "ol/proj";

export const useMap = ({ targetId, initialLocation, canAddMarkers }) => {
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(null);

  useEffect(() => {
    const map = new Map({ target: targetId });

    map.setView(
      new View({
        center: fromLonLat([
          initialLocation.getLongitude(),
          initialLocation.getLatitude(),
        ]),
        zoom: initialLocation.getZoom(),
      })
    );

    const rasterLayer = new TileLayer({ source: new OSM() });
    map.setLayers([rasterLayer]);

    if (canAddMarkers) {
      vectorSourceRef.current = new VectorSource();
      const vectorLayer = new VectorLayer({ source: vectorSourceRef.current });
      map.addLayer(vectorLayer);
    }

    // Change mouse pointer if hovering above marker
    map.on("pointermove", (event) => {
      var hit = map.hasFeatureAtPixel(event.pixel);
      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    mapRef.current = map;
    return () => map.setTarget(null);
  }, [targetId, initialLocation, canAddMarkers]);

  return { mapRef: mapRef, vectorSourceRef: vectorSourceRef };
};
