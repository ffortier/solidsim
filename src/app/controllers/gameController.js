'use strict';

class GameController {
    constructor($scope) {
        this.$scope = $scope;
    }
}

angular.module('appControllers').controller('GameController', GameController);