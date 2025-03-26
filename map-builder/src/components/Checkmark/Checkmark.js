import styles from "./Checkmark.module.css";

import React from "react";

export function Checkmark({ label, state, setState, disabled = false }) {
  return (
    <label className={styles.labelStyle}>
      <input
        type="checkbox"
        checked={state}
        onChange={setState}
        disabled={disabled}
        style={{ marginRight: "6px" }}
      />
      {label}
    </label>
  );
}