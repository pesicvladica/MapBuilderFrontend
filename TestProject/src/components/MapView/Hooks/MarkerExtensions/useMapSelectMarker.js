import { useCallback, useEffect } from "react";

export const useMapSelectMarker = ({
  markers,
  previousMarkerId,
}) => {
  const selectMarker = useCallback(
    (markerId) =>
      markers?.find((marker) => marker.getId() === markerId)?.select(),
    [markers]
  );
  const deselectMarker = useCallback(
    (markerId) =>
      markers?.find((marker) => marker.getId() === markerId)?.deselect(),
    [markers]
  );

  useEffect(() => {
    markers?.find((marker) => marker.getId() === previousMarkerId)?.deselect();
  }, [markers, previousMarkerId]);

  return { selectMarker, deselectMarker };
};
