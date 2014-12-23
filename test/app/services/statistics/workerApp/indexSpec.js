'use strict';

import di from '../../../../../src/app/services/statistics/di';
import '../../../../../src/app/services/statistics/workerApp';

describe('workerApp', function() {

    var self, handlerChainFactory;

    beforeEach(function() {
        self = jasmine.createSpyObj('self', ['postMessage']);
        handlerChainFactory = jasmine.createSpyObj('handlerChainFactory', ['createHandlerChain']);

        di.inject('workerApp', { self, handlerChainFactory });
    });

    it('should do something', function() {
        expect(self.onmessage).toBeDefined();
    });

});