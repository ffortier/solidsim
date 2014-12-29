'use strict';

import BaseGenerator from './baseGenerator';
import Noise from 'noisejs';
import Matrix from './matrix';


function initCellDepth(noise, x, y) {
    // jshint validthis:true
    let val = noise.perlin2(x / 100, y / 100);
    
    Math.floor(this.depth_ * val);

    return Math.floor(this.depth_ * val);
}

export default class Generator3D extends BaseGenerator {

    constructor(width, height, depth) {
        this.width_ = width;
        this.height_ = height;
        this.depth_ = depth;
    }

    generate() {
        let groundLevel = Math.floor(Math.random() * this.depth_ - 1) + 1;
        let noise = new Noise(Math.random());

        return new Matrix(this.width_, this.height_, groundLevel, initCellDepth.bind(this, noise));
    }

}
