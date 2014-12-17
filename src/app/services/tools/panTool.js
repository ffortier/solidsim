'use strict';

import DragDropTool from './dragDropTool';

export default class PanTool extends DragDropTool {
    activate() {
        this.getDragDrop().subscribe(function (pos) {          
            console.log(pos);
        });
    }
}