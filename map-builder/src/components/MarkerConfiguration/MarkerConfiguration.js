import { Slider } from "../Slider/Slider";
import styles from "./MarkerConfiguration.module.css";

import React, { useState } from "react";

const MarkerConfiguration = ({ marker }) => {
  const [value, setValue] = useState(50); // Initial slider value is 50

  return (
    <div className={styles.containerStyle}>
      <h1>{marker.getId()}</h1>
      <button className={styles.closeButton} onClick={() => marker.deselect()}>
        Close
      </button>

      <Slider
        className={styles.slider}
        title={"Meters"}
        min={0}
        max={100}
        step={1}
        value={value}
        setValue={setValue}
      />

      <button className={styles.deleteButton} onClick={() => marker.delete()}>
        Delete
      </button>
    </div>
  );
};

export default MarkerConfiguration;
