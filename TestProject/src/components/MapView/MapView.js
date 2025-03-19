import styles from "./MapView.module.css";

import { CustomMarker } from "../MapMarker/CustomMarker";

import {
  SelectMarkerMapInteraction,
  CreateMarkerMapInteraction,
  DeleteMarkerMapInteraction,
} from "./MapInteraction";
import { MarkerInteractionType } from "../MapMarker/MarkerInteraction";
import { initialLocation } from "../../constants/TestingHelpers";

import React, { useCallback, useEffect, useState, useRef } from "react";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as LayerVector } from "ol/layer";
import { OSM, Vector as SourceVector } from "ol/source";
import { toLonLat } from "ol/proj";

const MapView = ({ onMapInteracted }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const [markerSource] = useState(new SourceVector());

  // Reference for create marker method
  const createMarkerRef = useRef(null);
  /**
   * Listener for handling events sent from Custom marker
   * Receives marker interaction object which have methods
   * getType() -> type of interaction sent
   * getObject() -> custom marker object that sent interaction
   */
  const onInteractionListener = useCallback(
    (markerInteraction) => {
      switch (markerInteraction.getType()) {
        case MarkerInteractionType.SELECT:
          const markerToSelect = markerInteraction.getObject();
          setPreviousSelection(currentMarker.current);
          setSelectedMarker(markerToSelect);
          onMapInteracted([new SelectMarkerMapInteraction(markerToSelect)]);
          break;
        case MarkerInteractionType.DESELECT:
          const markerToDeselect = markerInteraction.getObject();
          if (markerToDeselect === currentMarker.current) {
            setPreviousSelection(null);
            setSelectedMarker(null);
            onMapInteracted([new SelectMarkerMapInteraction(null)]);
          }
          break;
        case MarkerInteractionType.DELETE:
          const markerToDelete = markerInteraction.getObject();
          setMarkers((old) =>
            old.filter((marker) => marker !== markerToDelete)
          );
          onMapInteracted([new DeleteMarkerMapInteraction(markerToDelete)]);
          break;
        default:
          console.log(
            "Unhandled interaction type: ",
            markerInteraction.getType()
          );
          break;
      }
    },
    [onMapInteracted]
  );
  /**
   * Method that creates new custom marker and adds it to array of markers
   * After that map interaction event is sent to parent
   */
  const createMarkerForCoordinate = useCallback(
    (coordinate) => {
      const newMarker = new CustomMarker(
        coordinate[0],
        coordinate[1],
        onInteractionListener
      );
      setMarkers((old) => [...old, newMarker]);
      onMapInteracted([new CreateMarkerMapInteraction(newMarker)]);
    },
    [onInteractionListener, onMapInteracted]
  );
  // Setting reference to create marker method
  useEffect(() => {
    createMarkerRef.current = createMarkerForCoordinate;
  }, [createMarkerForCoordinate]);

  // States for current marker selected and previous marker selected
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [previousSelection, setPreviousSelection] = useState(null);
  // Creating ref for current marker so that we can access it from marker interaction listener
  const currentMarker = useRef(null);
  useEffect(() => {
    currentMarker.current = selectedMarker;
  }, [selectedMarker]);

  // MARK: - Helpers

  // Deactivates all interactions on map
  const deactivateInteractions = useCallback(() => {
    map?.getInteractions().forEach((interaction) => {
      interaction.setActive(false);
    });
  }, [map]);

  // Activates all interactions on map
  const activateInteractions = useCallback(() => {
    map?.getInteractions().forEach((interaction) => {
      interaction.setActive(true);
    });
  }, [map]);

  // MARK: - Event handlers

  const onMapSingleClickHandler = useCallback(
    (event) => {
      var clickedMarkers = map?.getFeaturesAtPixel(event.pixel);
      if (clickedMarkers.length === 0) {
        // Deselect selected marker if any otherwise create new marker
        if (selectedMarker) {
          selectedMarker.deselect();
        } else {
          createMarkerRef.current(toLonLat(event.coordinate));
        }
      } else {
        // Select marker
        clickedMarkers[0].select();
      }
    },
    [map, selectedMarker]
  );

  const onMapPointerDrag = useCallback(
    (event) => {
      // Check if marker is selected on pointer down
      // Also if that pointer is currently selected marker
      // In that case move marker by draging
      // Otherwise move map
      var markerId = map?.getFeaturesAtPixel(event.pixel)[0]?.getId();
      if (markerId === selectedMarker?.getId()) {
        selectedMarker.getGeometry().setCoordinates(event.coordinate);
        deactivateInteractions();
        return;
      }
      activateInteractions();
    },
    [map, selectedMarker, activateInteractions, deactivateInteractions]
  );

  // MARK: - Setup

  useEffect(() => {
    const newMap = new Map({ target: "map-container" });

    newMap.setView(new View(initialLocation));

    const rasterLayer = new TileLayer({ source: new OSM() });
    const vectorLayer = new LayerVector({ source: markerSource });
    newMap.setLayers([rasterLayer, vectorLayer]);

    // Change mouse pointer if hovering above marker
    newMap.on("pointermove", (event) => {
      var hit = newMap.hasFeatureAtPixel(event.pixel);
      newMap.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    setMap(newMap);
    return () => newMap.setTarget(null);
  }, [markerSource]);

  useEffect(() => {
    // Register single click event handler once map is placed
    map?.on("singleclick", onMapSingleClickHandler);

    return () => {
      // Remove listener once not needed any more
      map?.un("singleclick", onMapSingleClickHandler);
    };
  }, [map, onMapSingleClickHandler]);

  // MARK: - Update

  useEffect(() => {
    // Separate markers in two array
    // One array contains markers that should be removed from map
    // Other one contains markers that should be added to map
    const existing = markerSource.getFeatures();

    const oldIds = new Set(existing.map((f) => f.getId()));
    const allIds = new Set(markers.map((m) => m.getId()));

    const toRemove = existing.filter((f) => !allIds.has(f.getId()));
    const toAdd = markers.filter((m) => !oldIds.has(m.getId()));

    markerSource.removeFeatures(toRemove);
    markerSource.addFeatures(toAdd);
  }, [markers, markerSource]);

  useEffect(() => {
    // When selected marker gets updated deselect previously selected marker
    previousSelection?.deselect();

    // If marker is selected add pointer drag listener
    // If not make sure that map has interactions enabled
    if (selectedMarker) {
      map?.on("pointerdrag", onMapPointerDrag);
    } else {
      activateInteractions();
    }

    return () => {
      map?.un("pointerdrag", onMapPointerDrag);
    };
  }, [map, selectedMarker, onMapPointerDrag, activateInteractions]);

  // MARK: - Render

  return <div id="map-container" className={styles.mapContainer} />;
};

export default MapView;
