'use strict';

/**
 *  Computes the geometry for a board
 */
export class BoardGeometry {

    constructor(data, width, height) {
        this.data = data;
        this.width = width;
        this.height = height;
    }

    compute(x, y) {
        // TODO
    }

    getData(x, y, w, h) {
        var topLeftViewport = this.compute(0, 0);
        var bottomRightViewport = this.compute(this.width, this.height);
        var topLeftBlock = this.compute(x, y);
        var bottomRightBlock = this.compute(x + w, y + h);

        console.log(topLeftViewport, bottomRightViewport, topLeftBlock, bottomRightBlock);
    }

}