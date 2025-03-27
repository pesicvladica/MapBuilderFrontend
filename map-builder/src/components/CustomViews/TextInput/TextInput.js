import styles from "./TextInput.module.css";

import React from "react";

export function TextInput({
  label,
  rightLabel,
  value,
  onChange,
  placeholder = "",
  disabled = false,
}) {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type="text"
        className={styles.inputField}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {rightLabel && <label className={styles.rightLabel}>{rightLabel}</label>}
    </div>
  );
}