class PinGraphic {
  #svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="256"
      height="256"
      viewBox="0 0 256 256"
      xml:space="preserve"
    >
      <g
        style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <path
          d="M 45 90 c -1.415 0 -2.725 -0.748 -3.444 -1.966 l -4.385 -7.417 C 28.167 65.396 19.664 51.02 16.759 45.189 c -2.112 -4.331 -3.175 -8.955 -3.175 -13.773 C 13.584 14.093 27.677 0 45 0 c 17.323 0 31.416 14.093 31.416 31.416 c 0 4.815 -1.063 9.438 -3.157 13.741 c -0.025 0.052 -0.053 0.104 -0.08 0.155 c -2.961 5.909 -11.41 20.193 -20.353 35.309 l -4.382 7.413 C 47.725 89.252 46.415 90 45 90 z"
          style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: OUTER_COLOR; fill-rule: nonzero; opacity: 1;"
          transform="matrix(1 0 0 1 0 0)"
          stroke-linecap="round"
        />
        <path
          d="M 45 45.678 c -8.474 0 -15.369 -6.894 -15.369 -15.368 S 36.526 14.941 45 14.941 c 8.474 0 15.368 6.895 15.368 15.369 S 53.474 45.678 45 45.678 z"
          style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: INNER_COLOR; fill-rule: nonzero; opacity: 1;"
          transform="matrix(1 0 0 1 0 0)"
          stroke-linecap="round"
        />
      </g>
    </svg>
  `;

  constructor(outerColor, innerColor) {
    this.#svg = this.#svg.replace("INNER_COLOR", innerColor);
    this.#svg = this.#svg.replace("OUTER_COLOR", outerColor);
  }

  getImage() {
    return "data:image/svg+xml;utf8," + encodeURIComponent(this.#svg);
  }
}

export class Pin {
  static normal = new PinGraphic("blue", "white").getImage();
  static selected = new PinGraphic("red", "white").getImage();
}
