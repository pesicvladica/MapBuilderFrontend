import { useEffect, useState } from "react";

import { MapViewLocation } from "../Helpers/MapViewLocation";

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          new MapViewLocation(
            position.coords.latitude,
            position.coords.longitude,
            15
          )
        );
      },
      (error) => {
        setError(error.message);
      }
    );
  }, []);

  return { location, error };
};
