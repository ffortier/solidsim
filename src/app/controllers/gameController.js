'use strict';

class GameController {
    constructor($scope, toolFactory, gameGenerator) {
        $scope.toolItems = toolFactory.createAll().map(tool => ({ name: tool.constructor.name, tool: tool }));
        $scope.activeTool = $scope.toolItems[0].tool;
        $scope.game = gameGenerator.generate();
    }
}

angular.module('appControllers').controller('GameController', GameController);