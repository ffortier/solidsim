'use strict';

import Renderer2D from './renderers/renderer2D';

angular.module('appServices').provider('rendererFactory', function(gameGeneratorProvider) {

    return {
        $get: function($injector) {
            // TODO Check if 2D or 3D
            return {
                create: ($element) => $injector.instantiate(Renderer2D, { $element })
            };
        }
    };

});
