'use strict';

import BaseTool from './baseTool';

export default class DragDropTool extends BaseTool {
    getDragDrop() {
        var mousedown = this.getObservable('mousedown');
        var mousemove = this.getObservable('mousemove');
        var mouseup = this.getObservable('mouseup');

        var mousedrag = mousedown.selectMany(function (md) {

            // calculate offsets when mouse down
            var startX = md.offsetX, startY = md.offsetY;

            // Calculate delta with mousemove until mouseup
            return mousemove.select(function (mm) {
                mm.preventDefault();

                return {
                    left: mm.clientX - startX,
                    top: mm.clientY - startY
                };
            }).takeUntil(mouseup);
        });

        return mousedrag;
    }
}