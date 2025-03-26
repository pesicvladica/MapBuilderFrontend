import styles from "./MarkerConfiguration.module.css";

import { Checkmark } from "../Checkmark/Checkmark";
import { Slider } from "../Slider/Slider";

import React, { useEffect, useState } from "react";
import { TextInput } from "../TextInput/TextInput";

const MarkerConfiguration = ({ marker }) => {
  const [radius, setRadius] = useState(50);
  const [showRadius, setShowRadius] = useState(true);
  const [maxRadius, setMaxRadius] = useState(100);

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

      <div className={styles.checkMark}>
        <Checkmark
          label={"Show radius"}
          state={showRadius}
          setState={(e) => setShowRadius(e.target.checked)}
        />
        {showRadius && (<TextInput label={"Max R: "} value={maxRadius} onChange={(e)=>setMaxRadius(e.target.value)} />)}
      </div>

      {showRadius && (
        <Slider
          title={"Meters"}
          min={0}
          max={maxRadius}
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
