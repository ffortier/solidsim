describe('app/services/statistics/statistics', function() {
    'use strict';

    var Worker, worker, statistics;

    beforeEach(module('appServices'));

    beforeEach(module(function($provide) {
        worker = jasmine.createSpyObj('worker', ['postMessage', 'terminate']);
        Worker = jasmine.createSpy('Worker').andReturn(worker);

        $provide.decorator('$window', function($delegate) {
            var F = function() {
                this.Worker = Worker;
            };

            F.prototype = $delegate;

            return new F();
        });
    }));

    beforeEach(inject(function(statisticsFactory, $rootScope) {
        statistics = statisticsFactory.create({}, $rootScope);
    }));

    it('should observe worker\'s messages', inject(function() {
        var spy = jasmine.createSpy('spy');
        
        statistics.subscribe(spy);

        worker.onmessage(makeMessageEvent(1));
        worker.onmessage(makeMessageEvent(2));
        worker.onmessage(makeMessageEvent(3));

        expect(spy).toHaveBeenCalledWith(1);
        expect(spy).toHaveBeenCalledWith(2);
        expect(spy).toHaveBeenCalledWith(3);
    }));

    it('should stop listening once disposed', inject(function() {
        var spy1 = jasmine.createSpy('spy1');
        var spy2 = jasmine.createSpy('spy2');

        var subscription1 = statistics.subscribe(spy1);
        var subscription2 = statistics.subscribe(spy2);

        worker.onmessage(makeMessageEvent(1));
        subscription1.dispose();
        worker.onmessage(makeMessageEvent(2));
        subscription2.dispose();
        worker.onmessage(makeMessageEvent(3));

        expect(spy1).toHaveBeenCalledWith(1);
        expect(spy1).not.toHaveBeenCalledWith(2);
        expect(spy1).not.toHaveBeenCalledWith(3);
        expect(spy2).toHaveBeenCalledWith(1);
        expect(spy2).toHaveBeenCalledWith(2);
        expect(spy2).not.toHaveBeenCalledWith(3);
    }));

    it('should terminate the worker when game is over', inject(function($rootScope) {
        $rootScope.$emit('gameOver');
        $rootScope.$apply();

        expect(worker.terminate).toHaveBeenCalled();
    }));

    it('should forward cellUpdates to the worker', inject(function($rootScope) {
        var data = {};

        $rootScope.$emit('cellUpdate', data);
        $rootScope.$apply();

        expect(worker.postMessage).toHaveBeenCalledWith(data);
    }));

    function makeMessageEvent(data) {
        return {
            type: 'message',
            data: data
        };
    }

});