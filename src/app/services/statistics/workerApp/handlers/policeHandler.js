'use strict';

import BaseHandler from './baseHandler';

export default class PoliceHandler extends BaseHandler {
    constructor() {
        super('cellUpdate');
    }

    handle(data, updates, next) {
        // TODO: Update cell statistics
    }
}