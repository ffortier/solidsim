'use strict';

import BaseHandler from '../handlers/baseHandler';

/**
 *  Changes the signature of an aggregator to make it usable by a hanlder chain
 */
export default class AggregatorHandlerAdapter extends BaseHandler {
    constructor(aggregator) {
        super('*');
        
        this.aggregator = aggregator;
    }

    handle(data, updates, next) {
        this.aggregator.send();

        next();
    }
}