export const MarkerComponentEvents = {
  SelectableComponent: () => ({
    className: "SelectableComponent",
    isSelected: () => ({
      className: "SelectableComponent",
      methodName: "isSelected",
    }),
    select: () => ({
      className: "SelectableComponent",
      methodName: "select",
    }),
    deselect: () => ({
      className: "SelectableComponent",
      methodName: "deselect",
    }),
  }),
  DeletableComponent: () => ({
    className: "DeletableComponent",
    delete: () => ({
      className: "DeletableComponent",
      methodName: "delete",
    }),
  }),
  MovableComponent: () => ({
    className: "MovableComponent",
    getMapEventCoordinates: () => ({
      className: "MovableComponent",
      methodName: "getMapEventCoordinates",
    }),
    setMapEventCoordinates: (coordinates) => ({
      className: "MovableComponent",
      methodName: "setMapEventCoordinates",
      value: coordinates,
    }),
  }),
  RadiusComponent: () => ({
    className: "RadiusComponent",
    getShowRadius: () => ({
      className: "RadiusComponent",
      methodName: "getShowRadius",
    }),
    setShowRadius: (show) => ({
      className: "RadiusComponent",
      methodName: "setShowRadius",
      value: show,
    }),
    getMinRadius: () => ({
      className: "RadiusComponent",
      methodName: "getMinRadius",
    }),
    setMinRadius: (minRadius) => ({
      className: "RadiusComponent",
      methodName: "setMinRadius",
      value: minRadius,
    }),
    getMaxRadius: () => ({
      className: "RadiusComponent",
      methodName: "getMaxRadius",
    }),
    setMaxRadius: (maxRadius) => ({
      className: "RadiusComponent",
      methodName: "setMaxRadius",
      value: maxRadius,
    }),
  }),
  MetadataComponent: () => ({
    className: "MetadataComponent",
    getTitle: () => ({
      className: "MetadataComponent",
      methodName: "getTitle",
    }),
    setTitle: (title) => ({
      className: "MetadataComponent",
      methodName: "setTitle",
      value: title,
    }),
  }),
};
