'use strict';

import { BoardController } from './board/boardController';
import { BoardRenderer } from './renderer/boardRenderer';

angular.module('appComponents').directive('board', function(rx, geometryFactory) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'assets/components/board.html',
        replace: true,
        require: 'ngModel',
        controller: BoardController,
        link: function($scope, $element, $attrs, ngModel) {
            var renderer = new BoardRenderer($element);

            ngModel.$parsers.push(geometryFactory.createGeometry);
            ngModel.$formatters.push(geo => geo && geo.data);

            $scope.$on('renderCells', function(e, cells) {
                renderer.render(ngModel.$viewValue, cells);
            });

            ngModel.$render = function() {
                renderer.render(ngModel.$viewValue);
            };
        }
    };
});
