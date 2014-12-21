'use strict';

import di from '../di';

class WorkerApp {
    constructor(handlerFactory, self) {
        self.onmessage = function(data) {
            self.onmessage = handlerFactory.createHandlerChain(data);
        };
    }
}

di.register('workerApp', WorkerApp);