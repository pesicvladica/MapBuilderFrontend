import styles from "./MarkerConfiguration.module.css";

import React from "react";

const MarkerConfiguration = ({ className, marker, onClosePressed }) => {
  return (
    <div className={className}>
      <div className={styles.containerStyle}>
        <h1>{marker.getId()}</h1>
        <button className={styles.closeButton} onClick={onClosePressed}>
          Close
        </button>

        <button className={styles.deleteButton} onClick={ () => marker.delete() }>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MarkerConfiguration;
