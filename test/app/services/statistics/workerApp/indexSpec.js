'use strict';

import di from '../../../../../src/app/services/statistics/di';
import '../../../../../src/app/services/statistics/workerApp';

describe('workerApp', function() {

    var self, handlerFactory;

    beforeEach(function() {
        self = jasmine.createSpyObj('self', ['postMessage']);
        handlerFactory = jasmine.createSpyObj('handlerFactory', ['createHandlerChain']);

        di.inject('workerApp', { self, handlerFactory });
    });

    it('should do something', function() {
        expect(self.onmessage).toBeDefined();
    });

});