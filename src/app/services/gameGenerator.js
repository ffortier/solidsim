'use strict';

import Generator2D from './generators/generator2D';

angular.module('appServices').provider('gameGenerator', function() {

    var provider = {
        $get: function($injector) {
            return $injector.instantiate(Generator2D, {
                width: this.width,
                height: this.height
            });
        }
    };

    Object.defineProperty(provider, 'width', {
        value: 10
    });

    Object.defineProperty(provider, 'height', {
        value: 10
    });

    return provider;

});