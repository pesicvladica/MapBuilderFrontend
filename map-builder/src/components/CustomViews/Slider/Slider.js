import React from "react";

import styles from "./Slider.module.css";

export function Slider({ title, min, max, step, value, setValue }) {
  const inputId = "customRange";

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderLabels}>
        <span>{min}</span>
        <span>{max}</span>
      </div>

      <div className={styles.sliderWrapper}>
        <input
          type="range"
          id={inputId}
          className={styles.customSlider}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value));
          }}
        />
      </div>
      <label htmlFor={inputId}>
        {value} {title}
      </label>
    </div>
  );
}