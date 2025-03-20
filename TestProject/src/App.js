import styles from './App.module.css';

import MapView from './components/MapView/MapView';
import SubmitButton from './components/SubmitButton/SubmitButton';
import MarkerConfiguration from './components/MarkerConfiguration/MarkerConfiguration';

import { MapInteractionType } from "./components/MapView/MapViewInteraction";

import React, { useCallback, useState } from "react";

function App() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // MARK: - Map handlers 

  const onMapInteractedHandler = useCallback((interactions) => {
    interactions.forEach(interaction => {
      switch (interaction.getType()) {
        case MapInteractionType.CREATE_MARKER:
          const markerCreated = interaction.getObject();
          setMarkers((old) => [...old, markerCreated]);
          break;
        case MapInteractionType.SELECT_MARKER:
          const markerSelected = interaction.getObject();
          setSelectedMarker(markerSelected);
          break;
        case MapInteractionType.DELETE_MARKER:
          const markerDeleted = interaction.getObject();
          setMarkers((old) => old.filter((marker) => marker !== markerDeleted));
          setSelectedMarker(null);
          break;
        default:
          console.log("Unhandled interaction type: ", interaction.getType());
          break;
      }
    });
  }, []);

  // MARK: - Form handler

  const submitButtonHandler = () => {
    console.log("Submitting markers: ", markers);
  };

  // MARK: - Render 

  return (
    <div className={styles.container}>
      <MapView
        onMapInteracted={onMapInteractedHandler}
      />

      {selectedMarker && (
        <MarkerConfiguration
          className={styles.configuration}
          marker={selectedMarker}
        />
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
