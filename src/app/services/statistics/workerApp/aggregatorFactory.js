'use strict';

import di from '../di';
import DataAggregator from './aggregators/dataAggregator';

class AggregatorFactory {
    constructor(self) {
        this.self_ = self;
    }

    create() {
        return new DataAggregator(this._self);
    }
}

di.register('aggregatorFactory', AggregatorFactory);