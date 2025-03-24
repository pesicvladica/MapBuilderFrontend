import styles from "./SubmitButton.module.css";

import React from "react";

const SubmitButton = ({ children, onButtonPressed, className }) => {
  return (
    <div className={className}>
      <button className={styles.buttonStyle} onClick={onButtonPressed}>
        {children}
      </button>
    </div>
  );
};

export default SubmitButton;
