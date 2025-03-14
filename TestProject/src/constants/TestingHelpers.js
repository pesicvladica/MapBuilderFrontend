import { fromLonLat } from "ol/proj";

export const initialLocation = {
  center: fromLonLat([21.893548, 43.3148356]),
  zoom: 15,
};

    //   axios
    //     .get(
    //       `http://localhost:${
    //         process.env.REACT_APP_BACKEND_PORT || 8080
    //       }/load-markers`
    //     )
    //     .then((res) => {
    //       setMarkers(res.data.markers);
    //     });

        // axios.post(
    //   `http://localhost:${
    //     process.env.REACT_APP_BACKEND_PORT || 5000
    //   }/save-markers`,
    //   { markers }
    // );