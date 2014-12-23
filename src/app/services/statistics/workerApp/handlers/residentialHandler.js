'use strict';

import BaseHandler from './baseHandler';

export default class ResidentialHandler extends BaseHandler {
    constructor() {
        super('timeUpdate');
    }

    handle(data, updates, next, aggregator) {
        // TODO: Update cell allocations
        aggregator.add('population', {
            value: 1000,
            diff: {
                added: [],
                deleted: []
            }
        });
    }
}