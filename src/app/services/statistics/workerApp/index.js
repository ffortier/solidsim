'use strict';

import di from '../di';

function noOp() {}

class WorkerApp {
    constructor(handlerChainFactory, self) {
        self.onmessage = function(data) {
            this.chains_ = {
                updateChange: handlerChainFactory.createHandlerChain(data, 'updateChange'),
                timeUpdate: handlerChainFactory.createHandlerChain(data, 'timeUpdate')
            };

            self.onmessage = e => (this.chains_[e.data.type] || noOp)(e.data.updates);
        }.bind(this);
    }
}

di.register('workerApp', WorkerApp);