import styles from "./MapView.module.css";

import { location as defaultLocation } from "./Helpers/MapViewConstants";

import { useMap } from "./Hooks/useMap";
import { useMapEventInteractions } from "./Hooks/useMapEventInteractions";

import { useMapMarkers } from "./Hooks/MarkerHandling/useMapMarkers";
import { useMapSingleclick } from "./Hooks/Interactions/useMapSingleclick";

import { useMarkerInteraction } from "./Hooks/MarkerHandling/useMarkerInteraction";
import { useMapPointerdrag } from "./Hooks/Interactions/useMapPointerdrag";

const MapView = ({ onMapInteracted }) => {
  const mapContainerId = "map-container";

  const { mapRef, vectorSourceRef } = useMap({
    targetId: mapContainerId,
    initialLocation: defaultLocation,
    canAddMarkers: true,
  });
  
  const { markers, setMarkers} = useMapMarkers({ 
    vectorSourceRef 
  });
  const { currentMarkerId, previousMarkerId } = useMarkerInteraction({
    markers,
    setMarkers,
  });

  useMapSingleclick({
    mapRef,
    markers,
    setMarkers,
    currentMarkerId,
    previousMarkerId,
  });
  useMapPointerdrag({ 
    mapRef, 
    currentMarkerId 
  });

  useMapEventInteractions({ 
    currentMarkerId, 
    markers, 
    onMapInteracted 
  });

  return <div id={mapContainerId} className={styles.mapContainer} />;
};

export default MapView;