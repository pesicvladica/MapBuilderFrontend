import { MovableComponent } from "../MovableComponent.js";
import { DeletableComponent } from "../DeletableComponent.js";
import { SelectableComponent } from "../SelectableComponent.js";
import { RadiusComponent } from "../RadiusComponent.js";
import { MetadataComponent } from "../MetadataComponent.js";

import { MarkerComponentEvents } from "../../MarkerComponentEvents";

export class ComponentInstaller {
  #marker;

  constructor(marker) {
    this.#marker = marker;
  }

  #installSelectableComponent() {
    let selectable = new SelectableComponent();
    selectable.attach(this.#marker);

    this.#marker.addComponent(
      MarkerComponentEvents.SelectableComponent().className,
      selectable
    );
  }

  #installDeletableComponent() {
    let deletable = new DeletableComponent();
    deletable.attach(this.#marker);

    this.#marker.addComponent(
      MarkerComponentEvents.DeletableComponent().className,
      deletable
    );
  }

  #installMovableComponent() {
    let movable = new MovableComponent();
    movable.attach(this.#marker);

    this.#marker.addComponent(
      MarkerComponentEvents.MovableComponent().className,
      movable
    );
  }

  #installRadiusComponent() {
    let radius = new RadiusComponent();
    radius.attach(this.#marker);

    this.#marker.addComponent(
      MarkerComponentEvents.RadiusComponent().className,
      radius
    );
  }

  #installMetadataComponent() {
    let metadata = new MetadataComponent();
    metadata.attach(this.#marker);

    this.#marker.addComponent(
      MarkerComponentEvents.MetadataComponent().className,
      metadata
    );
  }

  installComponents() {
    this.#installSelectableComponent();
    this.#installDeletableComponent();
    this.#installMovableComponent();
    this.#installRadiusComponent();
    this.#installMetadataComponent();
  }
}
