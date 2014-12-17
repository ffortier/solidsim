'use strict';

/**
 *  Renders a board in canvas
 */
export default class BoardRenderer {
    constructor($element) {

    }

    render(geo, cells) {
        var rect = this.computeRect_(cells);
        var data = geo.getData();

        // TODO
    }

    computeRect_(cells) {
        // TODO
        
        if (cells) {
            return {};
        }

        return {};
    }
}