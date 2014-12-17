'use strict';

import DragDropTool from './dragDropTool';

export default class PanTool extends DragDropTool {
    constructor(rx) {
        super(rx);
    }
    
    activate() {
        this.getDragDrop().subscribe(function (pos) {
            pos.$scope.$emit('panChange', { left: pos.left, top: pos.top });
        });
    }
}