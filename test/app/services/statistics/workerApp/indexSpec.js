'use strict';

import di from '../../../../../src/app/services/statistics/di';
import '../../../../../src/app/services/statistics/workerApp';

describe('workerApp', function() {

    var events = require('events');
    var self, handlerChainFactory, clock;

    class ClockMock extends events.EventEmitter {
        constructor() {
            this.start = jasmine.createSpy('ClockMock.start');
        }
    }

    beforeEach(function() {
        self = jasmine.createSpyObj('self', ['postMessage']);
        clock = new ClockMock();
        handlerChainFactory = jasmine.createSpyObj('handlerChainFactory', ['createHandlerChain']);

        di.inject('workerApp', { self, handlerChainFactory, clock });
    });

    it('should do something', function() {
        expect(self.onmessage).toBeDefined();
    });

});