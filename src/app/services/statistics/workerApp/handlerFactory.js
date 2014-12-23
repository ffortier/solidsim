'use strict';

import di from '../di';
import PoliceHandler from './handlers/policeHandler';
import ResidentialHandler from './handlers/residentialHandler';

/**
 *  Creates all the handlers
 */
class HandlerFactory {
    createAll() {
        return [
            this.createPoliceHandler(),
            this.createResidentialHandler()
        ];
    }
    
    createPoliceHandler() {
        return new PoliceHandler();
    }

    createResidentialHandler() {
        return new ResidentialHandler();
    }
}

di.register('handlerFactory', HandlerFactory);