'use strict';

/**
 *  Creates an observable on a new worker to compute the statistics on cellUpdate
 */
export default function statistics (game, rx, $window, $scope) {
    var worker = new $window.Worker('app/service/statistics/worker.js');
    var observers = [];

    worker.onmessage = function(e) {
        observers.forEach(o => o.onNext(e.data));
    };

    worker.postMessage(game);

    $scope.$on('cellUpdate', (e, data) => worker.postMessage(data));

    $scope.$on('gameOver', (e) => {
        observers.forEach(o => o.onCompleted());
        worker.terminate();
    });

    return rx.Observable.create(function(observer) {
        observers.push(observer);

        return function() {
            observers.splice(observers.indexOf(observer), 1);
        };
    });
}