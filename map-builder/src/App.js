import React from "react";

import styles from "./App.module.css";

import MapView from "./components/MapView/MapView";

import MarkerConfiguration from "./components/MarkerConfiguration/MarkerConfiguration";

import { useMapInteractionHandler } from "./components/SubmitForm/Hooks/useMapInteractionHandler";
import SubmitButton from "./components/CustomViews/SubmitButton/SubmitButton";

function App() {
  const { markers, selectedMarker, onMapInteractedHandler } =
    useMapInteractionHandler();


    function downloadJSON(filename, jsonData) {
      const jsonString = JSON.stringify(jsonData, null, 2);

      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }


  // MARK: - Form handler

  const submitButtonHandler = () => {
    const markerConfigs = markers.map((marker) => marker.exportConfiguration());
    downloadJSON("markers.json", markerConfigs);
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
