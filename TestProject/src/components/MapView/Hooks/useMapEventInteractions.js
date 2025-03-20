import { useEffect, useRef } from "react";

import {
  CreateMarkerMapInteraction,
  SelectMarkerMapInteraction,
  DeleteMarkerMapInteraction,
} from "../MapViewInteraction";

export const useMapEventInteractions = ({
  currentMarkerId,
  markers,
  onMapInteracted,
}) => {
  const previousMarkersRef = useRef([]);

  useEffect(() => {
    onMapInteracted([new SelectMarkerMapInteraction(markers.find((m) => m.getId() === currentMarkerId))]);
  }, [currentMarkerId, markers, onMapInteracted]);

  useEffect(() => {
    const existing = previousMarkersRef.current;

    const oldIds = new Set(existing.map((f) => f.getId()));
    const allIds = new Set(markers.map((m) => m.getId()));

    const deleted = existing.filter((f) => !allIds.has(f.getId()));
    const created = markers.filter((m) => !oldIds.has(m.getId()));

    onMapInteracted(created.map((m) => new CreateMarkerMapInteraction(m)));
    onMapInteracted(deleted.map((m) => new DeleteMarkerMapInteraction(m)));

    previousMarkersRef.current = markers;
  }, [markers, onMapInteracted]);
};