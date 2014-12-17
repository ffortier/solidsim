'use strict';

import PanTool from './tools/panTool';
import ResidentialTool from './tools/residentialTool';

class ToolFactory {

    constructor($injector) {
        this.$injector = $injector;
    }

    createPanTool() {
        return this.$injector.instantiate(PanTool);
    }

    createResidentialTool() {
        return this.$injector.instantiate(ResidentialTool);
    }

}

angular.module('appServices').service('toolFactory', ToolFactory);