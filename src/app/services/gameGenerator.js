'use strict';

import Generator2D from './generators/generator2D';
import Generator3D from './generators/generator3D';

var modes = {
    '2D': Generator2D,
    '3D': Generator3D
};

angular.module('appServices').provider('gameGenerator', function() {

    var provider = {
        $get: function($injector) {
            return $injector.instantiate(modes[this.mode], {
                width: this.width,
                height: this.height,
                depth: this.depth
            });
        }
    };

    Object.defineProperty(provider, 'width', {
        value: 10
    });

    Object.defineProperty(provider, 'height', {
        value: 10
    });

    Object.defineProperty(provider, 'depth', {
        value: 10
    });

    Object.defineProperty(provider, 'mode', {
        value: '3D'
    });

    return provider;

});