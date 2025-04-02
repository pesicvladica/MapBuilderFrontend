import { DeleteInteraction } from "../MarkerInteraction";
import { BaseComponent } from "./Utilities/BaseComponent";

export class DeletableComponent extends BaseComponent {
  attach(marker) {
    super.attach(marker);

    this.deleteInteraction = new DeleteInteraction(this.marker);
  }

  delete() {
    if (!this.marker) return;

    if (this.marker.onInteractionListener) {
      this.marker.onInteractionListener(this.deleteInteraction);
    }
  }

  dispose() {
    this.deleteInteraction = null;
    super.dispose();
  }

  clone() {
    return new DeletableComponent();
  }
}
