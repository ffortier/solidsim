'use strict';

import BaseHandler from './baseHandler';

class PowerHandler extends BaseHandler {

    constructor() {
        super('timeUpdate cellUpdate');
    }

    handle(data, updates, next) {
        // TODO: Update cell
    }

}