'use strict';

import di from '../di';
import PoliceHandler from './handlers/policeHandler';
import ResidentialHandler from './handlers/residentialHandler';
import PowerHandler from './handlers/powerHandler';

/**
 *  Creates all the handlers
 */
class HandlerFactory {
    /**
     *  Order matters
     */
    createAll() {
        return [
            this.createPoliceHandler(),
            this.createResidentialHandler(),
            this.createPowerHandler()
        ];
    }
    
    createPoliceHandler() {
        return new PoliceHandler();
    }

    createResidentialHandler() {
        return new ResidentialHandler();
    }

    createPowerHandler() {
        return new PowerHandler();
    }
}

di.register('handlerFactory', HandlerFactory);