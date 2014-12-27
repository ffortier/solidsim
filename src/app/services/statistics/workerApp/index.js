'use strict';

import di from '../di';

function noOp() {}

class WorkerApp {
    constructor(handlerChainFactory, self, clock) {
        self.onmessage = function(data) {
            let timeUpdateChain = handlerChainFactory.createHandlerChain(data, 'timeUpdate');

            this.chains_ = {
                updateChange: handlerChainFactory.createHandlerChain(data, 'updateChange'),
                configChange: handlerChainFactory.createHandlerChain(data, 'configChange'),
            };

            clock.on('tick', data => timeUpdateChain(data));
            clock.start(2000);

            self.onmessage = e => (this.chains_[e.data.type] || noOp)(e.data.updates);
        }.bind(this);
    }
}

di.register('workerApp', WorkerApp);