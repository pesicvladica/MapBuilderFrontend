import React, { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Select } from "ol/interaction";
import { click } from "ol/events/condition";
import { Style, Icon } from "ol/style";

import MapMarker from "../MapMarker/Marker";
import axios from "axios";
import "./MapView.css";

// center: fromLonLat([21.893548, 43.3148356]),
// zoom: 15,

const MapView = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const markerSource = new VectorSource(); // Vector source for markers
  const markerLayer = new VectorLayer({ source: markerSource });

  useEffect(() => {
    axios
      .get(
        `http://localhost:${
          process.env.REACT_APP_BACKEND_PORT || 8080
        }/load-markers`
      )
      .then((res) => {
        setMarkers(res.data.markers);
      });
  }, []);

  useEffect(() => {
    const newMap = new Map({
      target: "map-container",
      layers: [new TileLayer({ source: new OSM() }), markerLayer],
      view: new View({
        center: fromLonLat([21.893548, 43.3148356]),
        zoom: 15,
      }),
    });

    // Handle map click to add marker
    newMap.on("click", (event) => onMapClick(toLonLat(event.coordinate)));

    setMap(newMap);
    return () => newMap.setTarget(null);
  }, [markerLayer]);

  const onMapClick = (coords) => {
    // Check if click was on an existing marker
    const featuresAtClick = map.getFeaturesAtPixel(coords);
    if (featuresAtClick.length > 0) {
      selectMarker(featuresAtClick[0]);
      return;
    }

    // Otherwise, add new marker
    addMarker(coords);
  };

  const addMarker = (coords) => {
    const newMarker = {
      id: markers.length + 1,
      longitude: coords[0],
      latitude: coords[1],
      selected: false,
    };

    setMarkers([...markers, newMarker]);

    const markerFeature = MapMarker(newMarker);
    markerFeature.setId(newMarker.id);
    markerSource.addFeature(markerFeature);
  };

  const selectMarker = (feature) => {
    markerSource.getFeatures().forEach((marker) => {
      const selected = marker === feature;
      marker.setStyle(
        new Style({
          image: new Icon({
            src: selected
              ? "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg" // Selected
              : "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg", // Default
            scale: 0.05,
          }),
        })
      );
    });
  };

  const saveMarkers = () => {
    axios.post(
      `http://localhost:${
        process.env.REACT_APP_BACKEND_PORT || 5000
      }/save-markers`,
      { markers }
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <button className="primary-save" onClick={saveMarkers}>
        Save Markers
      </button>

      <div id="map-container" style={{ width: "100%", height: "100%" }}></div>

      {markers.map((marker) => (
        <MapMarker
          longitude={marker.longitude}
          latitude={marker.latitude}
          selected={marker.selected}
        />
      ))}
    </div>
  );
};

export default MapView;
