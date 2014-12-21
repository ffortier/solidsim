'use strict';

import di from './di';
import './workerApp';

di.register('self', function() {
    return self;
});

di.initialize();