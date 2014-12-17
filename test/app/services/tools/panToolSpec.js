describe('panTool', function() {
    'use strict';

    var panTool;

    beforeEach(module('appServices'));

    beforeEach(inject(function(toolFactory) {
        panTool = toolFactory.createPanTool();
        panTool.activate();
    }));

    it('should emit pan events', inject(function($rootScope) {
        var sc = $rootScope.$new();
        var geometry = {};
        var handler = jasmine.createSpy('handler');

        $rootScope.$on('panMove', handler);

        panTool.mousedown(makeMouseEvent('mousedown', sc, geometry, 10, 10));
        panTool.mousemove(makeMouseEvent('mousemove', sc, geometry, 10, 15));
        panTool.mouseup(makeMouseEvent('mouseup', sc, geometry, 10, 15));

        expect(handler).toHaveBeenCalledWith(jasmine.any(Object), { left: 0, top: 5 });
    }));

    it('should stop emitting events once released', inject(function($rootScope) {
        var sc = $rootScope.$new();
        var geometry = {};
        var handler = jasmine.createSpy('handler');

        $rootScope.$on('panMove', handler);
        panTool.release();
        panTool.mousedown(makeMouseEvent('mousedown', sc, geometry, 10, 10));
        panTool.mousemove(makeMouseEvent('mousemove', sc, geometry, 10, 15));
        panTool.mouseup(makeMouseEvent('mouseup', sc, geometry, 10, 15));

        expect(handler).not.toHaveBeenCalled();
    }));

    function makeMouseEvent(type, sc, geometry, clientX, clientY) {
        var isDefaultPrevented_ = false;

        return {
            preventDefault: function() { isDefaultPrevented_ = true; },
            isDefaultPrevented: function() { return isDefaultPrevented_; },
            geometry: geometry,
            $scope: sc,
            clientX: clientX,
            clientY: clientY
        };
    }

});