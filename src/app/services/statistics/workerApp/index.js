'use strict';

class WorkerApp {
    constructor(handlerFactory, self) {
        self.onmessage = function(data) {
            self.onmessage = handlerFactory.createHandlerChain(data);
        };
    }
}

workerContext.register('workerApp', WorkerApp).dependencies('handlerFactory, self')