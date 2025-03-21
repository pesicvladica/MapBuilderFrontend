import { useEffect, useState } from "react";

export const useMapMarkers = ({ vectorSourceRef }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const existing = vectorSourceRef.current.getFeatures();

    const oldIds = new Set(existing.map((f) => f.getId()));
    const allIds = new Set(markers.map((m) => m.getId()));

    const toRemove = existing.filter((f) => !allIds.has(f.getId()));
    const toAdd = markers.filter((m) => !oldIds.has(m.getId()));

    vectorSourceRef.current.removeFeatures(toRemove);
    vectorSourceRef.current.addFeatures(toAdd);
  }, [markers, vectorSourceRef]);

  return { markers, setMarkers };
};