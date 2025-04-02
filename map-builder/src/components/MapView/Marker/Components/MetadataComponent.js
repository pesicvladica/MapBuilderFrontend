import { BaseComponent } from "./Utilities/BaseComponent";

export class MetadataComponent extends BaseComponent {
  #title;

  constructor(title) {
    super();
    this.#title = title ?? "Marker Title";
  }

  getTitle() {
    return this.#title;
  }

  setTitle(title) {
    this.#title = title;
  }

  dispose() {
    this.#title = null;
  }

  clone() {
    return new MetadataComponent(this.#title);
  }

  exportConfiguration() {
    return {
      metadata: {
        title: this.#title,
      },
    };
  }
}
