'use strict';

import PanTool from './tools/panTool';
import ResidentialTool from './tools/residentialTool';

angular.module('appServices').factory('tools', function() {

    return [
        new PanTool(),
        new ResidentialTool(true),
        new ResidentialTool(false)
    ];

});