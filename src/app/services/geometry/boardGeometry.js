'use strict';

/**
 *  Computes the geometry for a board
 */
export default class BoardGeometry {

    constructor(data) {
        this.data = data;
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

    createView(x1, y1, x2, y2) {
        var maxX = Math.max(x1, x2);
        var maxY = Math.max(y1, y2);
        var cells = [];
        var last = null;

        for (let x = Math.min(x1, x2); x < maxX; x++) {
            for (let y = Math.min(y1, y2); y < maxY; y++) {
                var cell = this.compute(x, y);

                if (cell && (!last || cell.x !== last.x && cell.y !== last.y)) {
                    cells.push(cell);
                    last = cell;
                }
            }
        }
    }

}
