'use strict';

export default function statistics (game, rx, $window, $scope) {
    return rx.Observable.create(function(observer) {
        var worker = new $window.Worker('app/service/statistics/worker.js');

        var messageHandlers = {
            next: d => observer.onNext(d),
            end: () => observer.onCompleted()
        };

        worker.postMessage({
            type: 'init',
            args: [game]
        });

        $scope.$on('cellUpdate', (e) => worker.postMessage({
            type: 'cellUpdate',
            args: Array.prototype.slice.call(arguments, 1)
        }));

        $scope.$on('gameEnd', (e) => worker.postMessage({
            type: 'gameEnd',
            args: []
        }));

        worker.on('message', function(e) {
            messageHandlers[e.data.type](...e.args);
        });

        return function() {
            worker.terminate();
        };

    });
}