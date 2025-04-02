import { DeselectInteraction, SelectInteraction } from "../MarkerInteraction";
import { BaseComponent } from "./Utilities/BaseComponent";

export class SelectableComponent extends BaseComponent {
  #selected;

  constructor() {
    super();

    this.#selected = false;
  }

  attach(marker) {
    super.attach(marker);

    this.selectInteraction = new SelectInteraction(this.marker);
    this.deselectInteraction = new DeselectInteraction(this.marker);
  }

  isSelected() {
    return this.#selected;
  }

  select() {
    if (!this.marker || this.#selected) return;

    this.#selected = true;
    this.marker.updateStyle();

    if (this.marker.onInteractionListener) {
      this.marker.onInteractionListener(this.selectInteraction);
    }
  }

  deselect() {
    if (!this.marker || !this.#selected) return;

    this.#selected = false;
    this.marker.updateStyle();

    if (this.marker.onInteractionListener) {
      this.marker.onInteractionListener(this.deselectInteraction);
    }
  }

  dispose() {
    this.#selected = null;
    this.selectInteraction = null;
    this.deselectInteraction = null;
    super.dispose();
  }

  clone() {
    return new SelectableComponent();
  }
}
