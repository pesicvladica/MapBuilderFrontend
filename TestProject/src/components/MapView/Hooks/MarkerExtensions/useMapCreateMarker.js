import { useCallback } from "react";

import { CustomMarker } from "../../Marker/CustomMarker";

export const useMapCreateMarker = ({ setMarkers }) => {
  const createMarkerHandler = useCallback(
    (coordinate) => {
      const newMarker = new CustomMarker(coordinate[0], coordinate[1]);
      setMarkers((old) => [...old, newMarker]);
    },
    [setMarkers]
  );

  return { createMarkerHandler };
};
