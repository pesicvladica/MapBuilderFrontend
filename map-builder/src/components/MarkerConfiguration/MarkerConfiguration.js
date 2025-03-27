import styles from "./MarkerConfiguration.module.css";

import { Checkmark } from "../CustomViews/Checkmark/Checkmark";
import { Slider } from "../CustomViews/Slider/Slider";
import { TextInput } from "../CustomViews/TextInput/TextInput";

import React, { useEffect, useState } from "react";

const MarkerConfiguration = ({ marker }) => {
  const [title, setTitle] = useState(marker.title);
  const [radius, setRadius] = useState(marker.radius);
  const [showRadius, setShowRadius] = useState(marker.showRadius);
  const [minRadius, setMinRadius] = useState(marker.minRadius);
  const [maxRadius, setMaxRadius] = useState(marker.maxRadius);

  useEffect(() => {
    setTitle(marker.title);
    setRadius(marker.radius);
    setShowRadius(marker.showRadius);
    setMinRadius(marker.minRadius);
    setMaxRadius(marker.maxRadius);
  }, [marker]);

  useEffect(() => {
    marker.title = title;
  }, [marker, title])

  useEffect(() => {
    marker.setRadius(radius);
  }, [marker, radius]);

  useEffect(() => {
    marker.setShowRadius(showRadius);
  }, [marker, showRadius]);

  useEffect(() => {
    marker.minRadius = minRadius;
  }, [marker, minRadius]);

  useEffect(() => {
    marker.maxRadius = maxRadius;
  }, [marker, maxRadius]);

  return (
    <div className={styles.containerStyle}>
      <div className={styles.titleField}>
        <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <button className={styles.closeButton} onClick={() => marker.deselect()}>
        Close
      </button>

      <Checkmark
        label={"Show radius"}
        state={showRadius}
        setState={(e) => setShowRadius(e.target.checked)}
      />

      {showRadius && (
        <div className={styles.radiusContainer}>

          <div className={styles.radiusSettings}>
            <TextInput
              label={"Min Radius"}
              value={minRadius}
              onChange={(e) => setMinRadius(e.target.value)}
            />
            <TextInput
              rightLabel={"Max Radius"}
              value={maxRadius}
              onChange={(e) => setMaxRadius(e.target.value)}
            />
          </div>

          <Slider
            title={"Meters"}
            min={minRadius}
            max={maxRadius}
            step={1}
            value={radius}
            setValue={setRadius}
          />
        </div>
      )}

      <div className={styles.spacing}></div>

      <button className={styles.deleteButton} onClick={() => marker.delete()}>
        Delete
      </button>
    </div>
  );
};

export default MarkerConfiguration;
