xdescribe('app/services/statistics/worker', function() {
    'use strict';

    var worker;

    beforeEach(function() {
        worker = new Worker('/base/build/app/services/statistics/worker.js');
    });

    afterEach(function() {
        worker.terminate();
    });

    it('should do something', function() {
        var initialized = false;

        worker.onmessage = function() {
            initialized = true;
        };

        worker.postMessage({});

        waitsFor(function() {
            return initialized; 
        });
    });

});