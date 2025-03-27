import React from "react";

import styles from "./App.module.css";

import MapView from "./components/MapView/MapView";

import MarkerConfiguration from "./components/MarkerConfiguration/MarkerConfiguration";

import { useMapInteractionHandler } from "./components/SubmitForm/Hooks/useMapInteractionHandler";
import SubmitButton from "./components/CustomViews/SubmitButton/SubmitButton";

function App() {
  const { markers, selectedMarker, onMapInteractedHandler } = useMapInteractionHandler();

  // MARK: - Form handler

  const submitButtonHandler = () => {
    console.log("Submitting markers: ", markers);
  };

  // MARK: - Render

  return (
    <div className={styles.container}>
      <MapView onMapInteracted={onMapInteractedHandler} />

      {selectedMarker && (
        <div className={styles.configuration}>
          <MarkerConfiguration marker={selectedMarker} />
        </div>
      )}

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
