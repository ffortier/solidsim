'use strict';

angular.module('app.components').directive('zoomable', function(geometryFactory) {
    return {
        restrict: 'C',
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModel) {
            ngModel.$parsers.push(geometryFactory.createZoomableGeometry);
            ngModel.$formatters.push(geo => geo && geo.baseGeometry);
        }
    };
});