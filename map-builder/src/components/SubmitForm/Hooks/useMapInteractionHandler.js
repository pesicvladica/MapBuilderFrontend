import { useCallback, useState } from "react";
import { MapInteractionType } from "../../MapView/MapViewInteraction";

export const useMapInteractionHandler = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onMapInteractedHandler = useCallback((interactions) => {
    interactions.forEach((interaction) => {
      switch (interaction.getType()) {
        case MapInteractionType.CREATE_MARKER:
          const markerCreated = interaction.getObject();
          setMarkers((old) => [...old, markerCreated]);
          break;
        case MapInteractionType.SELECT_MARKER:
          const markerSelected = interaction.getObject();
          setSelectedMarker(markerSelected);
          break;
        case MapInteractionType.DELETE_MARKER:
          const markerDeleted = interaction.getObject();
          setMarkers((old) => old.filter((marker) => marker !== markerDeleted));
          setSelectedMarker(null);
          break;
        default:
          console.log("Unhandled interaction type: ", interaction.getType());
          break;
      }
    });
  }, []);

  return {
    markers,
    selectedMarker,
    onMapInteractedHandler,
  };
};
