'use strict';

angular.module('appComponents').directive('tool', function() {

    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            var activeTool;

            $element.on('click', forwardEvent);
            $element.on('dblclick', forwardEvent);
            $element.on('mousedown', forwardEvent);
            $element.on('mouseup', forwardEvent);
            $element.on('mousemove', forwardEvent);

            $scope.$watch($attrs.tool, function(newValue, oldValue) {
                if (oldValue) {
                    oldValue.release();
                }

                if (newValue) {
                    newValue.activate();
                }

                activeTool = newValue;
            });

            function forwardEvent(e) {
                if (activeTool) {
                    activeTool[e.type](e);
                }
            }
        }
    };

});