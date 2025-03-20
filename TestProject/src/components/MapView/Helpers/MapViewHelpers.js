// Deactivates all interactions on map
export const deactivateInteractions = (map) => {
  map?.getInteractions().forEach((interaction) => interaction.setActive(false));
};

// Activates all interactions on map
export const activateInteractions = (map) => {
  map?.getInteractions().forEach((interaction) => interaction.setActive(true));
};
