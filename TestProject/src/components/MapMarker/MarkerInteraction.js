export const MarkerInteractionType = {
  SELECT: "Select",
  DESELECT: "Deselect",
  DELETE: "Delete",
};

class MarkerInteraction {
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

export class SelectInteraction extends MarkerInteraction {
  constructor(object) {
    super(MarkerInteractionType.SELECT, object);
  }
}

export class DeselectInteraction extends MarkerInteraction {
  constructor(object) {
    super(MarkerInteractionType.DESELECT, object);
  }
}

export class DeleteInteraction extends MarkerInteraction {
  constructor(object) {
    super(MarkerInteractionType.DELETE, object);
  }
}
