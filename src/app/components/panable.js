'use strict';

angular.module('app.components').directive('panable', function(geometryFactory) {
    return {
        restrict: 'C',
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModel) {
            ngModel.$parsers.push(geometryFactory.createPanableGeometry);
            ngModel.$formatters.push(geo => geo && geo.baseGeometry);
        }
    };
});