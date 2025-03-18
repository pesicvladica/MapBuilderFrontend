export const MapInteractionType = {
  CREATE_MARKER: "Create",
  SELECT_MARKER: "Select",
  DELETE_MARKER: "Delete",
};

class MapInteraction {
  constructor(type, object) {
    this.type = type;
    this.object = object;
  }

  getType() {
    return this.type;
  }

  getObject() {
    return this.object;
  }
}

export class CreateMapMarkerInteraction extends MapInteraction {
  constructor(object) {
    super(MapInteractionType.CREATE_MARKER, object);
  }
}

export class SelectMapMarkerInteraction extends MapInteraction {
  constructor(object) {
    super(MapInteractionType.SELECT_MARKER, object);
  }
}

export class DeleteMapMarkerInteraction extends MapInteraction {
  constructor(object) {
    super(MapInteractionType.DELETE_MARKER, object);
  }
}
