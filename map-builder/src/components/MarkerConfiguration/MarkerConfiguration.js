import styles from "./MarkerConfiguration.module.css";

import { Checkmark } from "../CustomViews/Checkmark/Checkmark";
import { Slider } from "../CustomViews/Slider/Slider";
import { TextInput } from "../CustomViews/TextInput/TextInput";

import React, { useEffect, useReducer } from "react";
import { MarkerComponentEvents } from "../MapView/Marker/MarkerComponentEvents";

const MarkerConfiguration = ({ marker }) => {
  const getMarkerState = (m) => {
    return {
      title: m.trigger(MarkerComponentEvents.MetadataComponent().getTitle()),
      radius: m.getMarkerRadius(),
      showRadius: m.trigger(
        MarkerComponentEvents.RadiusComponent().getShowRadius()
      ),
      minRadius: m.trigger(
        MarkerComponentEvents.RadiusComponent().getMinRadius()
      ),
      maxRadius: m.trigger(
        MarkerComponentEvents.RadiusComponent().getMaxRadius()
      ),
    };
  };
  const setMarkerState = (m, key, value) => {
    switch (key) {
      case "title":
        m.trigger(MarkerComponentEvents.MetadataComponent().setTitle(value));
        break;
      case "radius":
        m.setMarkerRadius(value);
        break;
      case "showRadius":
        m.trigger(MarkerComponentEvents.RadiusComponent().setShowRadius(value));
        break;
      case "minRadius":
        m.trigger(MarkerComponentEvents.RadiusComponent().setMinRadius(value));
        break;
      case "maxRadius":
        m.trigger(MarkerComponentEvents.RadiusComponent().setMaxRadius(value));
        break;
      default:
        console.log("Unahdled event");
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return { ...state, [action.key]: action.value };
      case "resetAll":
        return action.newState;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, getMarkerState(marker));
  const { title, radius, showRadius, minRadius, maxRadius } = state;

  const onChange = (key, value) => {
    dispatch({ type: "update", key, value });
    setMarkerState(marker, key, value);
  };

  useEffect(() => {
    const newState = getMarkerState(marker);
    dispatch({ type: "resetAll", newState });
  }, [marker]);

  return (
    <div className={styles.containerStyle}>
      <div className={styles.titleField}>
        <TextInput
          value={title}
          onChange={(e) => {
            onChange("title", e.target.value);
          }}
        />
      </div>

      <button
        className={styles.closeButton}
        onClick={() => {
          marker.trigger(
            MarkerComponentEvents.SelectableComponent().deselect()
          );
        }}
      >
        Close
      </button>

      <Checkmark
        label={"Show radius"}
        state={showRadius}
        setState={(e) => {
          onChange("showRadius", e.target.checked);
        }}
      />

      {showRadius && (
        <div className={styles.radiusContainer}>
          <div className={styles.radiusSettings}>
            <TextInput
              label={"Min Radius"}
              value={minRadius}
              onChange={(e) => {
                onChange("minRadius", e.target.value);
              }}
            />
            <TextInput
              rightLabel={"Max Radius"}
              value={maxRadius}
              onChange={(e) => {
                onChange("maxRadius", e.target.value);
              }}
            />
          </div>

          <Slider
            title={"Meters"}
            min={minRadius}
            max={maxRadius}
            step={1}
            value={radius}
            setValue={(value) => {
              onChange("radius", value);
            }}
          />
        </div>
      )}

      <div className={styles.spacing}></div>

      <button
        className={styles.deleteButton}
        onClick={() => {
          marker.trigger(MarkerComponentEvents.DeletableComponent().delete());
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default MarkerConfiguration;
