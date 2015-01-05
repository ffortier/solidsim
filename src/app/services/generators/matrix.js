'use strict';

class Matrix {

    constructor(width, height, groundLevel, initCellDepthFunc) {
        this.data_ = [];
        this.groundLevel_ = groundLevel;

        for (let x = 0; x < width; x++) {
            this.data_[x] = [];

            for (let y = 0; y < height; y++) {
                this.data_[x][y] = (initCellDepthFunc(x, y) & 0X0F) << 24;
            }
        }
    }

}

Matrix.prototype.inRange = function* inRange(x1, y1, x2, y2) {
    let maxX = Math.max(x1, x2);
    let maxY = Math.max(y1, y2);

    for (let x = Math.min(x1, x2); x <= maxX; x++) {
        for (let y = Math.min(y1, y2); y <= maxY; y++) {
            let raw = this.data_[x][y];
            let depth = (raw & 0x0F000000) >> 24;
            let water = Math.max(0, this.groundLevel_ - depth);

            yield { depth, water };
        }
    }
};

['empty', 'water', 'hill'].forEach((name, index) => Object.defineProperty(Matrix, 'TYPE_' + name.toUpperCase(), {
    writable: false,
    value: index
}));

export default Matrix;