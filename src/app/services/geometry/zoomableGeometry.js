'use strict';

export default class ZoomableGeometry {

    constructor(baseGeometry) {
        this.baseGeometry_ = baseGeometry;
        this.zoomRatio_ = 1;
    }

    zoom(val) {
        this.zoomRatio = this.zoomRatio + val;
    }

    compute(x, y) {
        super.compute(Math.floor(x * this.zoomRatio), Math.floor(y * this.zoomRatio));
    }
    
}