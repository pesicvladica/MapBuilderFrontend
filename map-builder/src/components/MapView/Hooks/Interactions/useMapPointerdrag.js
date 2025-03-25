import { useCallback, useEffect } from "react";

import {
  activateInteractions,
  deactivateInteractions,
} from "../../Helpers/MapViewHelpers";

export const useMapPointerdrag = ({ mapRef, currentMarkerId }) => {
  const onMapPointerDrag = useCallback(
    (event) => {
      const map = mapRef?.current;
      if (!map) return;

      const marker = map.getFeaturesAtPixel(event.pixel)?.[0];
      const markerId = marker?.getId();
      if (currentMarkerId && markerId === currentMarkerId) {
        marker.setCoordinates(event.coordinate);
        deactivateInteractions(map);
        return;
      }

      activateInteractions(map);
    },
    [mapRef, currentMarkerId]
  );

  useEffect(() => {
    const map = mapRef?.current;
    if (!map) return;

    if (currentMarkerId) {
      map.on("pointerdrag", onMapPointerDrag);
    } else {
      activateInteractions(map);
    }

    return () => map.un("pointerdrag", onMapPointerDrag);
  }, [mapRef, currentMarkerId, onMapPointerDrag]);
};
