import styles from './App.module.css';
import MapView from './components/MapView/MapView';
import SubmitButton from './components/SubmitButton/SubmitButton';

import MapMarker from './components/MapMarker/MapMarker';

import React, { useState } from "react";

function App() {
  const [markers, setMarkers] = useState([]);
  
  const onMapClick = (coords) => {
    const marker = MapMarker(coords[0], coords[1], false);
    setMarkers((old) => [...old, marker]);
  };

  const submitButtonHandler = () => { };

  return (
    <div className={styles.container}>

      <MapView onMapPressed={onMapClick} markers={markers} />

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
