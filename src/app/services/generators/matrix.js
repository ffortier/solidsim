'use strict';

// 0    water
// 000  trees
// 0000 depth
// 0000 0000 attributes
// 0000 0000 offsetX
// 0000 0000 offsetY

function* inRange(data, x1, y1, x2, y2) {
    let maxX = Math.max(x1, x2);
    let maxY = Math.max(y1, y2);

    for (let x = Math.min(x1, x2); x <= maxX; x++) {
        for (let y = Math.min(y1, y2); y <= maxY; y++) {
            yield {};
        }
    }
}

class Matrix {

    constructor(width, height, groundLevel, initCellDepthFunc) {
        this.data_ = [];

        for (let x = 0; x < width; x++) {
            this.data_[x] = [];

            for (let y = 0; y < height; y++) {
                this.data_[x][y] = (initCellDepthFunc(x, y) & 0X0F) << 24;
            }
        }

        this.inRange = inRange.bind(this, this.data_);
    }

}

['empty', 'water', 'hill'].forEach((name, index) => Object.defineProperty(Matrix, 'TYPE_' + name.toUpperCase(), {
    writable: false,
    value: index
}));

export default Matrix;