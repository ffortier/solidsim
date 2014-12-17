'use strict';

import DragDropTool from './dragDropTool';

export default class MarqueeTool extends DragDropTool {
    constructor(rx) {
        super(rx);
    }
    
    activate() {
        this.getDragDrop().subscribe(function (pos) {          
            console.log(pos);
        });
    }
}