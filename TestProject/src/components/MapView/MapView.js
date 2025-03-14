import styles from "./MapView.module.css";

import { initialLocation } from "../../constants/TestingHelpers";

import React, { useEffect, useState } from "react";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as LayerVector } from "ol/layer";
import { OSM, Vector as SourceVector } from "ol/source";
import { toLonLat } from "ol/proj";

const MapView = ({ onMapPressed, markers }) => {
  const [map, setMap] = useState(null);
  const [markerSource, setMarkerSource] = useState(new SourceVector());

  useEffect(() => {
    const newMap = new Map({ target: "map-container" });

    newMap.setView(new View(initialLocation));

    const rasterLayer = new TileLayer({ source: new OSM() });
    const vectorLayer = new LayerVector({ source: markerSource });
    newMap.setLayers([ rasterLayer, vectorLayer ]);

    newMap.on("click", (event) => onMapPressed(toLonLat(event.coordinate)));
    
    setMap(newMap);
    return () => newMap.setTarget(null);
  }, []);

  useEffect(() => {
    markerSource.clear();
    markerSource.addFeatures(markers);
  }, [markers]);

  return (
    <div id="map-container" className={styles.mapContainer} />
  );
};

export default MapView;
