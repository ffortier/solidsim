'use strict';

import PanTool from './tools/panTool';
import ResidentialTool from './tools/residentialTool';
import HiResidentialTool from './tools/hiResidentialTool';

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

    createHiResidentialTool() {
        return this.$injector.instantiate(HiResidentialTool);
    }

    createAll() {
        return [
            this.createPanTool(),
            this.createResidentialTool(),
            this.createHiResidentialTool()
        ];
    }

}

angular.module('appServices').service('toolFactory', ToolFactory);