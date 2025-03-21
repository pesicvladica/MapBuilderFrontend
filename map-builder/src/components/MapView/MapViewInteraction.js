// Possible interactions that Map view can send to parent
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

export class CreateMarkerMapInteraction extends MapInteraction {
  constructor(object) {
    super(MapInteractionType.CREATE_MARKER, object);
  }
}

export class SelectMarkerMapInteraction extends MapInteraction {
  constructor(object) {
    super(MapInteractionType.SELECT_MARKER, object);
  }
}

export class DeleteMarkerMapInteraction extends MapInteraction {
  constructor(object) {
    super(MapInteractionType.DELETE_MARKER, object);
  }
}
