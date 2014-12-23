'use strict';

export default class BaseHandler {
    constructor(type) {
        Object.defineProperty(this, 'type', {
            value: type,
            writable: false
        });
    }

    handle(data, updates, next) {

    }
}