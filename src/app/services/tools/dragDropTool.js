'use strict';

import BaseTool from './baseTool';

export default class DragDropTool extends BaseTool {
    constructor(rx) {
        super(rx);
    }
    
    getDragDrop() {
        var mousedown = this.getObservable('mousedown');
        var mousemove = this.getObservable('mousemove');
        var mouseup = this.getObservable('mouseup');

        var mousedrag = mousedown.selectMany(function (md) {

            // calculate offsets when mouse down
            var startX = md.clientX, startY = md.clientY;

            // Calculate delta with mousemove until mouseup
            return mousemove.select(function (mm) {
                mm.preventDefault();

                return {
                    left: mm.clientX - startX,
                    top: mm.clientY - startY,
                    geometry: mm.geometry,
                    $scope: mm.$scope
                };
            }).takeUntil(mouseup);
        });

        return mousedrag;
    }
}