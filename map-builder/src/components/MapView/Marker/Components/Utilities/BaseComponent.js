export class BaseComponent {
  attach(marker) {
    this.marker = marker;
  }

  dispose() {
    this.marker = null;
  }

  clone() {
    return new BaseComponent();
  }

  exportConfiguration() {
    return {};
  }
}