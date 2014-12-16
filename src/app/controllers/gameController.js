'use strict';

var ngModule = angular.module('ngModule');

class GameController {
    constructor($scope) {
        this.$scope = $scope;
    }
}

ngModule.controller('GameController', GameController);