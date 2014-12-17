'use strict';

export default class BoardController {

    constructor($scope) {
        this.$scope = $scope;
    }

    setCellAttribute(cell, attribute) {
        this.$scope.$emit('renderCells', [cell]);
    }

    setCellsAttribute(cells, attribute) {
        this.$scope.$emit('renderCells', cells);
    }

}
