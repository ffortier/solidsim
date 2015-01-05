'use strict';

import Renderer2D from './renderers/renderer2D';
import Renderer3D from './renderers/renderer3D';

var modes = {
    '2D': Renderer2D,
    '3D': Renderer3D
};

angular.module('appServices').provider('rendererFactory', function(gameGeneratorProvider) {

    return {
        $get: function($injector) {
            return {
                create: ($element) => $injector.instantiate(modes[gameGeneratorProvider.mode], { $element })
            };
        }
    };

});
