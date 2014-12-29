'use strict';

import di from '../di';
import events from 'events';

class Clock extends events.EventEmitter {
    constructor(clockSettings) {
        this.year_ = clockSettings.year;
        this.month_ = clockSettings.month;
        this.speeds_ = clockSettings.speeds;
    }

    start(speedIndex = 0) {
        this.intervalId_ = setInterval(() => this.emit('tick', this.increment_()), this.speeds_[speedIndex]);
    }

    change(speedIndex = 0) {
        this.stop();
        this.start(speedIndex);
    }

    stop() {
        this.intervalId_ = clearInterval(this.intervalId_);
    }

    increment_() {
        if (++this.month_ === 12) {
            this.month_ = 0;
            this.year_ += 1;
            this.stop();
        }

        return { year: this.year_, month: this.month_ };
    }
}

di.register('clock', Clock);