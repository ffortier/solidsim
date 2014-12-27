import di from '../../../../../src/app/services/statistics/di';
import '../../../../../src/app/services/statistics/workerApp/clock';

describe('clock', function() {
    'use strict';

    var clock;

    beforeEach(function() {
        jasmine.Clock.useMock();

        clock = di.inject('clock', {
            clockSettings: {
                year: 2014,
                month: 0,
                speeds: [1000, 2000]
            }
        });
    });

    it('should tick every month and stop after each year', function() {
        var tickSpy = jasmine.createSpy('tickSpy');

        clock.start();
        clock.on('tick', tickSpy);

        ensureClearInterval();

        jasmine.Clock.tick(15000);

        expect(tickSpy.callCount).toBe(12);
        expect(tickSpy.calls.map(c => c.args[0].month)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0]);
        expect(tickSpy.calls.filter(c => c.args[0].year === 2014).length).toBe(11);
        expect(tickSpy.calls.filter(c => c.args[0].year === 2015).length).toBe(1);
    });

    /**
     *  Bug with jasmine clock
     *  https://github.com/jasmine/jasmine/issues/655
     */
    function ensureClearInterval() {
        let clearInterval = window.clearInterval;
        let cleared = [];

        spyOn(window, 'clearInterval').andCallFake(function(key) {
            cleared.push(key.toString());

            return clearInterval.apply(this, arguments);
        });

        Object.keys(jasmine.Clock.installed.scheduledFunctions).forEach(key => {
            let scheduledFunc = jasmine.Clock.installed.scheduledFunctions[key];

            if (scheduledFunc) {
                let funcToCall = scheduledFunc.funcToCall;

                spyOn(scheduledFunc, 'funcToCall').andCallFake(function() {
                    if (cleared.indexOf(key) === -1) {
                        return funcToCall.apply(this, arguments);
                    }
                });
            }
        })
    }
});