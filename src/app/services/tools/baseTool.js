'use strict';

const EVENTS = ['mousedown', 'mouseup', 'mousemove', 'click', 'dblclick'];

export default class BaseTool {
    constructor() {
        EVENTS.forEach(function(type) {
            this[type] = function(e) {
                if (this[type + 'Observer_']) {
                    this[type + 'Observer_'].onNext(e);
                }
            };
        }.bind(this));
    }

    getObservable(type) {
        var observable = this[type + 'Observable_'];

        if (!observable) {
            this[type + 'Observable_'] = Rx.Observable.create(function(observer) {
                this[type + 'Observer_'] = observer;
            });
        }
    }

    release() {
        EVENTS.filter(type => !!this[type + 'Observer_']).forEach(function(type) {
            this[type + 'Observer_'].onCompleted();
            this[type + 'Observable_'].dispose();
        }.bind(this));
    }

    activate() {}
}