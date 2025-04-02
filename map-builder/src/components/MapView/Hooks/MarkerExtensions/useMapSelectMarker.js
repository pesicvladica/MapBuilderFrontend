import { useCallback, useEffect } from "react";
import { MarkerComponentEvents } from "../../Marker/MarkerComponentEvents";

export const useMapSelectMarker = ({ markers, previousMarkerId }) => {
  const selectMarker = useCallback(
    (markerId) => {
      const marker = markers?.find((marker) => marker.getId() === markerId);
      if (marker) {
        marker.trigger(MarkerComponentEvents.SelectableComponent().select());
      }
    },
    [markers]
  );
  
  const deselectMarker = useCallback(
    (markerId) => {
      const marker = markers?.find((marker) => marker.getId() === markerId);
      if (marker) {
        marker.trigger(MarkerComponentEvents.SelectableComponent().deselect());
      }
    },
    [markers]
  );

  useEffect(() => {
    const marker = markers?.find((marker) => marker.getId() === previousMarkerId);
    if (marker) {
      marker.trigger(MarkerComponentEvents.SelectableComponent().deselect());
    }
  }, [markers, previousMarkerId]);

  return { selectMarker, deselectMarker };
};
