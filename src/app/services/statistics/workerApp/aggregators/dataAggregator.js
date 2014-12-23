'use strict';

export default class DataAggregator {
    constructor(self) {
        this.self_ = self;
    }

    add(type, data) {

    }

    send() {
        this.self_.postMessage();
    }
}