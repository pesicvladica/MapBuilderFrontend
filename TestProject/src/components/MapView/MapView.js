import styles from "./MapView.module.css";

import { CustomMarker } from "../MapMarker/CustomMarker";

import {
  SelectMapMarkerInteraction,
  CreateMapMarkerInteraction,
  DeleteMapMarkerInteraction,
} from "./MapInteraction";
import usePrevious from "../../utilities/usePrevious";
import { initialLocation } from "../../constants/TestingHelpers";

import React, { useEffect, useState } from "react";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as LayerVector } from "ol/layer";
import { OSM, Vector as SourceVector } from "ol/source";
import { toLonLat } from "ol/proj";

import Modify from "ol/interaction/Modify";
import { set } from "ol/transform";

const MapView = ({ onMapInteracted }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const [markerSource, setMarkerSource] = useState(new SourceVector());
  const [selectedMarker, setSelectedMarker] = useState(null);
  const previousSelection = usePrevious(selectedMarker);

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
        setSelectedMarker(null);
        onMapInteracted([new SelectMapMarkerInteraction(null)]);

        createMarkerForCoordinate(toLonLat(event.coordinate));
      } else {
        setSelectedMarker(features[0]);
        onMapInteracted([new SelectMapMarkerInteraction(features[0])]);
      }
    });

    setMap(newMap);
    return () => newMap.setTarget(null);
  }, []);

  // MARK: - Update

  useEffect(() => {
    if (!map) {
      return;
    }

    console.log(
      `Marker length: ${markers.length} - markers: ${markers}`,
      markers
    );

    if (markerSource.getFeatures().length === markers.length) {
      if (previousSelection) {
        previousSelection.setSelected(false);
      }

      if (selectedMarker) {
        selectedMarker.setSelected(true);
      }
    } else {
      const newMarkers = markers
        .filter(
          (marker) =>
            !markerSource
              .getFeatures()
              .find((feature) => feature.getId() === marker.getId())
        );

      const oldMarkers = markerSource
        .getFeatures()
        .filter(
          (feature) =>
            !markers
              .find((marker) => marker.getId() === feature.getId())
        );

      console.log("New markers: ", newMarkers);
      console.log("Old markers: ", oldMarkers);

      markerSource.addFeatures(newMarkers);
      markerSource.removeFeatures(oldMarkers);
    }
  }, [markers, selectedMarker]);

  // MARK: - Handlers

  const onDeleteListener = (markerToDelete) => {
    setMarkers((old) => old.filter((marker) => marker !== markerToDelete));

    onMapInteracted([new DeleteMapMarkerInteraction(markerToDelete)]);
  };

  // MARK: - Helpers

  const createMarkerForCoordinate = (coordinate) => {
    const newMarker = new CustomMarker(
      coordinate[0],
      coordinate[1],
      onDeleteListener
    );

    setMarkers((old) => [...old, newMarker]);

    onMapInteracted([new CreateMapMarkerInteraction(newMarker)]);
  };

  // MARK: - Render

  return <div id="map-container" className={styles.mapContainer} />;
};

export default MapView;
