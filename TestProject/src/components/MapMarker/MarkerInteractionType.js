export const MarkerInteractionType = {
  CREATE: "Create",
  SELECT: "Select",
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

export class SelectionInteraction extends MarkerInteraction {
  constructor(object) {
    super(MarkerInteractionType.SELECT, object);
  }
}

export class CreateInteraction extends MarkerInteraction {
  constructor(object) {
    super(MarkerInteractionType.CREATE, object);
  }
}

export class DeleteInteraction extends MarkerInteraction {
  constructor(object) {
    super(MarkerInteractionType.DELETE, object);
  }
}
