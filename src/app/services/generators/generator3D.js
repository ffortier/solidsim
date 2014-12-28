'use strict';

import BaseGenerator from './baseGenerator';
import waterGenerator from './elements/waterGenerator';
import mountainGenerator from './elements/mountainGenerator';
import lakeGenerator from './elements/lakeGenerator';
import riverGenerator from './elements/riverGenerator';

function assertBetween(val, min, max, message = 'Value {0} must be between {1} and {2}') {
    if (val < min || val > max) {
        throw new Error(String.format(message, val, min, max));
    }
}

const WATER_CELL = 0x80010000;

export default class Generator3D extends BaseGenerator {

    constructor(width, height, depth) {
        assertBetween(width, 10, 1000);
        assertBetween(height, 10, 1000);
        assertBetween(depth, 0, 15);

        this.width_ = width;
        this.height_ = height;
        this.depth_ = depth;
    }

    generate(water, river, forest, montains, lakes) {
        // 0    water
        // 000  trees
        // 0000 depth
        // 0000 0000 attributes
        // 0000 0000 offsetX
        // 0000 0000 offsetY
        let groundLevel = Math.floor(Math.random() * this.depth_ - 1) + 1;
        let data = this.makeData_(groundLevel);

        mountainGenerator(data, mountains);
        lakeGenerator(data, lakes);
        riverGenerator(data, river);
        waterGenerator(data, water);

        return this.waterize_(data, groundLevel);
    }

    makeData_(groundLevel) {
        let data = [];
        let defaultState = groundLevel << 24;

        for (let i = 0; i < this.width_; i++) {
            data[i] = [];

            for (let j = 0; j < this.height_; j++) {
                data[i][j] = defaultState;
            }
        }

        return data;
    }

    waterize_(data, groundLevel) {
        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data[x].length; y++) {
                if (((data[x][y] & 0x0F000000) >> 24) < groundLevel) {
                    data[x][y] |= WATER_CELL;
                }
            }
        }

        return data;
    }
}
