'use strict';

const EVENTS = ['mousedown', 'mouseup', 'mousemove', 'click', 'dblclick'];

export default class BaseTool {
    constructor(rx) {
        this.rx = rx;

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
            observable = this[type + 'Observable_'] = this.rx.Observable.create(function(observer) {
                this[type + 'Observer_'] = observer;
            }.bind(this));
        }

        return observable;
    }

    release() {
        EVENTS.filter(type => !!this[type + 'Observer_']).forEach(function(type) {
            this[type + 'Observer_'].onCompleted();
            this[type + 'Observable_'] = null;
            this[type + 'Observer_'] = null;
        }.bind(this));
    }

    activate() {}
}