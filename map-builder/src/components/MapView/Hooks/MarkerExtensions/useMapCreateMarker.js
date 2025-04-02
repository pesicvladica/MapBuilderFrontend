import { useCallback } from "react";

import { MapMarker } from "../../Marker/MapMarker";

export const useMapCreateMarker = ({ setMarkers }) => {
  const createMarkerHandler = useCallback(
    (coordinate) => {
      const newMarker = new MapMarker(coordinate[0], coordinate[1]);
      setMarkers((old) => [...old, newMarker]);
    },
    [setMarkers]
  );

  return { createMarkerHandler };
};
