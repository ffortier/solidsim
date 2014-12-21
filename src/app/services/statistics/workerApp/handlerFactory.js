'use strict';

import di from '../di';
import policeHandler from './handlers/policeHandler';

const HANDLERS = [policeHandler];

class HandlerFactory {
    createHandlerChain(data) {
        return function(e) {
            var index = 0;

            (function next() {
                if (index < HANDLERS.length) {
                    HANDLERS[index++](data, e.data, next);
                }
            })();
        };
    }
}

di.register('handlerFactory', HandlerFactory);