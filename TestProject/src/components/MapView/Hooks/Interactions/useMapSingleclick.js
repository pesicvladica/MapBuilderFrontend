import { useCallback, useEffect } from "react";

import { toLonLat } from "ol/proj";
import { useMapCreateMarker } from "../MarkerExtensions/useMapCreateMarker";
import { useMapSelectMarker } from "../MarkerExtensions/useMapSelectMarker";

export const useMapSingleclick = ({
  mapRef,
  markers,
  setMarkers,
  currentMarkerId,
  previousMarkerId,
}) => {
  const markerCreator = useMapCreateMarker({ setMarkers });
  const markerSelector = useMapSelectMarker({ markers, previousMarkerId });

  const singleClickHandler = useCallback(
    (event) => {
      const map = mapRef?.current;
      if (!map) return;

      const clickedMarkers = map.getFeaturesAtPixel(event.pixel);
      if (clickedMarkers.length === 0) {
        if (currentMarkerId) {
          markerSelector.deselectMarker(currentMarkerId);
        } else {
          markerCreator.createMarkerHandler(toLonLat(event.coordinate));
        }
      } else {
        markerSelector.selectMarker(clickedMarkers[0].getId());
      }
    },
    [mapRef, currentMarkerId, markerCreator, markerSelector]
  );

  useEffect(() => {
    const map = mapRef?.current;
    if (!map) return;

    map.on("singleclick", singleClickHandler);

    return () => map.un("singleclick", singleClickHandler);
  }, [mapRef, singleClickHandler]);
};