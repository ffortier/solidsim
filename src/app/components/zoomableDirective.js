'use strict';

angular.module('appComponents').directive('zoomable', function(geometryFactory) {
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
                geometry = geometryFactory.createZoomableGeometry(val);

                return geometry;
            });

            $scope.$on('zoomChange', function(e, val) {
                if (geometry) {
                    geometry.zoom(val);
                }
            });
        }
    };
});