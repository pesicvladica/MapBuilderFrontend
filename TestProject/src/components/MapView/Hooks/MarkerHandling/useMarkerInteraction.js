import { useEffect, useState, useCallback } from "react";

import { MarkerInteractionType } from "../../Marker/MarkerInteraction";

export const useMarkerInteraction = ({ markers, setMarkers }) => {
  const [currentMarkerId, setCurrentMarkerId] = useState(null);
  const [previousMarkerId, setPreviousMarkerId] = useState(null);

  const defaultInteractionListener = useCallback(
    (markerInteraction) => {
      switch (markerInteraction.getType()) {
        case MarkerInteractionType.SELECT:
          const currentToSelect = markerInteraction.getObject();
          setPreviousMarkerId((_) => currentMarkerId);
          setCurrentMarkerId((_) => currentToSelect.getId());
          break;
        case MarkerInteractionType.DESELECT:
          const currentToDeselect = markerInteraction.getObject();
          if (currentToDeselect.getId() === currentMarkerId) {
            setPreviousMarkerId((_) => null);
            setCurrentMarkerId((_) => null);
          }
          break;
        case MarkerInteractionType.DELETE:
          const currentToDelete = markerInteraction.getObject();
          setMarkers((old) =>
            old.filter((marker) => marker !== currentToDelete)
          );
          break;
        default:
          console.log(
            "Unhandled interaction type: ",
            markerInteraction.getType()
          );
          break;
      }
    },
    [currentMarkerId, setMarkers]
  );

  useEffect(() => {
    markers.forEach((marker) =>
      marker.setInteractionListener(defaultInteractionListener)
    );

    return () =>
      markers.forEach((marker) => marker.setInteractionListener(null));
  }, [markers, defaultInteractionListener]);

  return { currentMarkerId, previousMarkerId };
};
