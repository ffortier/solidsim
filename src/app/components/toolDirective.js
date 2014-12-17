'use strict';

angular.module('appComponents').directive('tool', function() {

    return {
        restrict: 'A',
        scope: {
            activeTool: '=tool'
        },
        link: function($scope, $element, $attrs) {
            $element.on('click', forwardEvent);
            $element.on('dblclick', forwardEvent);
            $element.on('mousedown', forwardEvent);
            $element.on('mouseup', forwardEvent);
            $element.on('mousemove', forwardEvent);

            function forwardEvent(e) {
                if ($scope.activeTool) {
                    $scope.activeTool[e.type](e);
                }
            }
        }
    };

});