export class MapViewLocation {
    constructor(latitude, longitude, zoom) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = zoom;
    }

    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }

    getZoom() {
        return this.zoom;
    }
}