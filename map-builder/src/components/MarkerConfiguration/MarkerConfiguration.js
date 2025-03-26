import styles from "./MarkerConfiguration.module.css";

import { Checkmark } from "../Checkmark/Checkmark";
import { Slider } from "../Slider/Slider";

import React, { useEffect, useState } from "react";

const MarkerConfiguration = ({ marker }) => {
  const [radius, setRadius] = useState(50);
  const [showRadius, setShowRadius] = useState(true);

  useEffect(() => {
    setRadius(marker.getRadius());
  }, [marker, setRadius]);

  useEffect(() => {
    marker.setRadius(radius);
  }, [marker, radius]);

  useEffect(() => {
    setShowRadius(marker.shouldShowCircle());
  }, [marker, setShowRadius]);

  useEffect(() => {
    marker.setShouldShowCircle(showRadius);
  }, [marker, showRadius]);

  return (
    <div className={styles.containerStyle}>
      <h1>{marker.getTitle()}</h1>
      <button className={styles.closeButton} onClick={() => marker.deselect()}>
        Close
      </button>

      <Checkmark
        label={"Show radius"}
        state={showRadius}
        setState={(e) => setShowRadius(e.target.checked)}
      />

      {showRadius && (
        <Slider
          title={"Meters"}
          min={0}
          max={100}
          step={1}
          value={radius}
          setValue={setRadius}
        />
      )}

      <div className={styles.spacing}></div>

      <button className={styles.deleteButton} onClick={() => marker.delete()}>
        Delete
      </button>
    </div>
  );
};

export default MarkerConfiguration;
