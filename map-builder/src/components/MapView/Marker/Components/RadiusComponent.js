import { BaseComponent } from "./Utilities/BaseComponent";

export class RadiusComponent extends BaseComponent {
  #showRadius;
  #minRadius;
  #maxRadius;

  constructor(showRadius, minRadius, maxRadius) {
    super();

    this.#showRadius = showRadius ?? true;
    this.#minRadius = minRadius ?? 10;
    this.#maxRadius = maxRadius ?? 100;
  }

  getShowRadius() {
    return this.#showRadius;
  }

  setShowRadius(show) {
    if (!this.marker || show === this.#showRadius) return;

    this.#showRadius = show;
    this.marker.updateStyle();
  }

  getMinRadius() {
    return this.#minRadius;
  }

  setMinRadius(minRadius) {
    this.#minRadius = minRadius;
  }

  getMaxRadius() {
    return this.#maxRadius;
  }

  setMaxRadius(maxRadius) {
    this.#maxRadius = maxRadius;
  }

  dispose() {
    this.#showRadius = null;
    this.#minRadius = null;
    this.#maxRadius = null;
  }

  clone() {
    return new RadiusComponent(
      this.#showRadius,
      this.#minRadius,
      this.#maxRadius
    );
  }

  exportConfiguration() {
    return {
      showRadius: this.#showRadius,
    };
  }
}
