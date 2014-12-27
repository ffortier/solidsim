'use strict';

import di from './di';
import './workerApp';

di.register('self', function() {
    return self;
});

di.register('clockSettings', function() {
    return {
        year: 2000,
        month: 0,
        speeds: [1000, 2000, 4000]
    }
})

di.initialize();