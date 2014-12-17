'use strict';

angular.module('appComponents').directive('panable', function(geometryFactory) {
    return {
        restrict: 'C',
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModel) {
            var baseGeometry;
            var geometry;

            ngModel.$parsers.push(function(val) {
                return baseGeometry;
            });

            ngModel.$formatters.push(function(val) {
                baseGeometry = val;
                geometry = geometryFactory.createPanableGeometry(val);

                return geometry;
            });

            $scope.$on('panChange', function(e, val) {
                if (geometry) {
                    geometry.pan(val);
                }
            });
        }
    };
});