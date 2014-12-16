'use strict';

/**
 *  Allow panning and zooming
 */
export class PanableGeometry {

    constructor(baseGeometry) {
        this.baseGeometry_ = baseGeometry;
        this.scrollTop_ = 0;
        this.scrollLeft_ = 0;
    }

    scrollDown() {
        this.scrollTop_ += 10;
    }

    scrollUp() {
        this.scrollTop_ -= 10;
    }

    scrollRight() {
        this.scrollLeft_ -= 10;
    }

    scrollLeft() {
        this.scrollLeft_ += 10;
    }

    compute(x, y) {
        this.baseGeometry_.compute(x + this.scrollLeft_, y + this.scrollTop_);
    }

}