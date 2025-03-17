import styles from "./MapView.module.css";

import {
  MapMarker,
  NormalMarkerStyle,
  SelectedMarkerStyle,
} from "../MapMarker/MapMarker";

import usePrevious from "../../utilities/usePrevious";
import { initialLocation } from "../../constants/TestingHelpers";

import React, { useEffect, useState } from "react";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as LayerVector } from "ol/layer";
import { OSM, Vector as SourceVector } from "ol/source";
import { toLonLat } from "ol/proj";

const MapView = ({ onMapPressed, markers, onMarkerSelected }) => {
  const [map, setMap] = useState(null);

  const [markerSource, setMarkerSource] = useState(new SourceVector());
  const [selectedFeature, setSelectedFeature] = useState(null);
  const previousSelection = usePrevious(selectedFeature);

  // MARK: - Setup

  useEffect(() => {
    const newMap = new Map({ target: "map-container" });

    newMap.setView(new View(initialLocation));

    const rasterLayer = new TileLayer({ source: new OSM() });
    const vectorLayer = new LayerVector({ source: markerSource });
    newMap.setLayers([rasterLayer, vectorLayer]);

    newMap.on("click", (event) => {

      var features = newMap.getFeaturesAtPixel(event.pixel);
      if (features.length === 0) {
        setSelectedFeature(null);
        onMapPressed(toLonLat(event.coordinate));
      } else {
        setSelectedFeature(features[0]);
        onMarkerSelected(features[0]);
      }
    });

    setMap(newMap);
    return () => newMap.setTarget(null);
  }, []);

  useEffect(() => {
    if (!map) { return; }

    if (markerSource.getFeatures().length === markers.length) {
      if (previousSelection) {
        previousSelection.setStyle(NormalMarkerStyle);
      }

      if (selectedFeature) {
        selectedFeature.setStyle(SelectedMarkerStyle);
      }
    } else {
      const mapMarkers = markers.map((marker) => {
        const mapMarker = MapMarker(marker[0], marker[1]);
        mapMarker.setStyle(NormalMarkerStyle);
        return mapMarker;
      });

      markerSource.clear();
      markerSource.addFeatures(mapMarkers);
    }

  }, [markers, selectedFeature]);

  // MARK: - Render

  return <div id="map-container" className={styles.mapContainer} />;
};

export default MapView;
