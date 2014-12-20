'use svtrict';

var di = require('di');

self.workerContext = di.createContext();

import './workerApp';

di.register('self', function() {
    return self;
});

self.initialize();