'use strict';

import policeHandler from './handlers/policeHandler';

class HandlerFactory {
    createHandlerChain(data) {
        return function() {

        }
    }
}

workerContext.register('handlerFactory', HandlerFactory);