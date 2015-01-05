'use strict';

angular.module('appComponents').directive('board', function(rx, geometryFactory, rendererFactory) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'assets/components/board.html',
        replace: true,
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModel) {
            let renderer = rendererFactory.create();

            ngModel.$formatters.push(geometryFactory.createGeometry);
            ngModel.$parsers.push(geo => geo && geo.data);

            $scope.$on('renderCells', function(e, cells) {
                renderer.render(ngModel.$viewValue, cells);
            });

            ngModel.$render = function() {
                renderer.render(ngModel.$viewValue);
            };
        }
    };
});
