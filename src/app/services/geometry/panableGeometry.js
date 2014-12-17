'use strict';

/**
 *  Allow panning and zooming
 */
export class PanableGeometry {

    constructor(baseGeometry) {
        this.baseGeometry_ = baseGeometry;
        this.offsetTop_ = 0;
        this.offsetLeft_ = 0;
    }

    pan(val) {
        this.offsetLeft_ += val.left;
        this.offsetTop_ += val.top;
    }

    compute(x, y) {
        this.baseGeometry_.compute(x + this.scrollLeft_, y + this.scrollTop_);
    }

}