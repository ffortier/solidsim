import di from '../../../../../src/app/services/statistics/di';
import '../../../../../src/app/services/statistics/workerApp/handlerChainFactory';

describe('handlerChainFactory', function() {
    'use strict';

    var handlerFactory, aggregatorFactory, handlerChainFactory;
    var handler1, handler2, handler3, aggregator;

    beforeEach(function() {
        handler1 = {
            type: 'type1',
            handle: jasmine.createSpy('handler1.handle').andCallFake((data, updates, next) => next())
        };

        handler2 = {
            type: 'type2',
            handle: jasmine.createSpy('handler1.handle').andCallFake((data, updates, next) => next())
        };
        
        handler3 = {
            type: 'type1 type2',
            handle: jasmine.createSpy('handler1.handle').andCallFake((data, updates, next) => next())
        };

        aggregator = {
            send: jasmine.createSpy('aggregator.send')
        };
        
        handlerFactory = jasmine.createSpyObj('handlerFactory', ['createAll']);
        handlerFactory.createAll.andReturn([handler1, handler2, handler3]);
        aggregatorFactory = jasmine.createSpyObj('aggregatorFactory', ['create']);
        aggregatorFactory.create.andReturn(aggregator);
        handlerChainFactory = di.inject('handlerChainFactory', { handlerFactory, aggregatorFactory });
    });

    it('should should filter by class-like name', function() {
        var type1Chain = handlerChainFactory.create({}, 'type1');
        var type2Chain = handlerChainFactory.create({}, 'type2');

        type1Chain({});

        expect(handler1.handle).toHaveBeenCalled();
        expect(handler2.handle).not.toHaveBeenCalled();
        expect(handler3.handle).toHaveBeenCalled();

        handler1.handle.reset();
        handler2.handle.reset();
        handler3.handle.reset();

        type2Chain({});

        expect(handler1.handle).not.toHaveBeenCalled();
        expect(handler2.handle).toHaveBeenCalled();
        expect(handler3.handle).toHaveBeenCalled();
    });

    it('should always call the aggregator', function() {
        var type1Chain = handlerChainFactory.create({}, 'type1');

        type1Chain({});

        expect(aggregator.send).toHaveBeenCalled();
    });

});