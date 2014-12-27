'use strict';

import di from '../di';
import AggregatorHandlerAdapter from './aggregators/aggregatorHandlerAdapter';

class HandlerChainFactory {
    constructor(handlerFactory, aggregatorFactory) {
        this.handlers = handlerFactory.createAll();
        this.aggregatorFactory = aggregatorFactory;
    }

    create(data, type) {
        var re = new RegExp('(?:^|\\s)' + RegExp.escape(type) + '(?:\\s|$)');
        var aggregator = this.aggregatorFactory.create();
        var arr = this.handlers.filter(h => re.test(h.type)).concat(new AggregatorHandlerAdapter(aggregator));

        return function(updates) {
            var index = 0;

            (function next() {
                if (index < arr.length) {
                    arr[index++].handle(data, updates, next, aggregator);
                }
            })();
        };
    }
}

di.register('handlerChainFactory', HandlerChainFactory);