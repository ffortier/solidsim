'use strict';

import di from '../di';

var events = require('events');

class Clock extends events.EventEmitter {
    constructor() {
        this.year_ = 2000;
        this.month_ = 0;
    }

    start(interval) {
        this.intervalId_ = setInterval(() => this.emit('tick', this.increment_()), interval);
    }

    change(interval) {
        this.stop();
        this.start(interval);
    }

    stop() {
        this.intervalId_ = clearInterval(this.intervalId_);
    }

    increment_() {
        if (++this.month_ === 12) {
            this.month_ = 0;
            this.year_ += 1;
        }

        return { year: this.year_, month: this.month_ };
    }
}

di.register('clock', Clock);