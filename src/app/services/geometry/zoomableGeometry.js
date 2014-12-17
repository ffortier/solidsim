'use strict';

export class ZoomableGeometry {

    constructor(baseGeometry) {
        this.baseGeometry_ = baseGeometry;
        this.zoomRatio_ = 1;
    }

    zoomIn() {
        this.zoomRatio = Math.min(1, this.zoomRatio + 0.1);
    }

    zoomOut() {
        this.zoomRatio = Math.max(0.2, this.zoomRatio - 0.1);
    }

    compute(x, y) {
        super.compute(Math.floor(x * this.zoomRatio), Math.floor(y * this.zoomRatio));
    }
    
}