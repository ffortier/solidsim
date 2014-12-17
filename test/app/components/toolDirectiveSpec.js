describe('toolDirective', function() {
    'use strict';

    var el, sc, $element;

    beforeEach(module('appComponents'));

    beforeEach(inject(function($compile, $rootScope) {

        el = document.createElement('div');
        el.setAttribute('data-tool', 'myTool');
        document.body.appendChild(el);

        sc = $rootScope.$new();

        $element = $compile(el)(sc);

        sc.$apply();

    }));

    afterEach(function() {
        el.parentNode.removeChild(el);
    });

    it('should activate myTool initially', inject(function() {

        sc.myTool = jasmine.createSpyObj('myTool', ['activate', 'release']);
        sc.$apply();

        expect(sc.myTool.activate).toHaveBeenCalled();
        expect(sc.myTool.release).not.toHaveBeenCalled();

    }));

    it('should release myTool when it changes and activate the new one', inject(function() {

        var myTool1 = sc.myTool = jasmine.createSpyObj('myTool', ['activate', 'release']);
        sc.$apply();

        var myTool2 = sc.myTool = jasmine.createSpyObj('myTool', ['activate', 'release']);
        sc.$apply();

        expect(myTool1.activate).toHaveBeenCalled();
        expect(myTool1.release).toHaveBeenCalled();
        expect(myTool2.activate).toHaveBeenCalled();
        expect(myTool2.release).not.toHaveBeenCalled();

    }));

    it('should forward my mouse events', inject(function() {
        sc.myTool = jasmine.createSpyObj('myTool', ['activate', 'release', 'mousedown']);
        sc.$apply();

        $element.triggerHandler('mousedown');

        expect(sc.myTool.mousedown).toHaveBeenCalled();
    }));

});