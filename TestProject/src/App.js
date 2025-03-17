import styles from './App.module.css';
import MapView from './components/MapView/MapView';
import SubmitButton from './components/SubmitButton/SubmitButton';

import React, { useState } from "react";

function App() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onMapClick = (coords) => {
    setMarkers((old) => [...old, coords]);
    console.log("New marker placed on map, coords: ", coords);
  };

  const onMarkerSelected = (marker) => {
    setSelectedMarker(marker);
    console.log("Marker selected: ", marker);
  }

  const submitButtonHandler = () => { };

  return (
    <div className={styles.container}>
      <MapView
        onMapPressed={onMapClick}
        markers={markers}
        onMarkerSelected={onMarkerSelected}
      />

      <SubmitButton
        className={styles.submitButton}
        onButtonPressed={submitButtonHandler}
      >
        Save
      </SubmitButton>
    </div>
  );
}

export default App;
