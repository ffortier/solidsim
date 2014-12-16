'use strict';

import { BoardController } from './boardController';

var ngModule = angular.module('app');

class GeometryFactory {
    createGeometry(data) {
        return new BoardGeometry(data);
    }
    
    createPanableGeometry(baseGeometry) {
        return new PanableGeometry(baseGeometry);
    }

    createZoomableGeometry(baseGeometry) {
        return new ZoomableGeometry(baseGeometry);
    }
}

ngModule.service('geometryFactory', GeometryFactory);

/**
 *  Computes the geometry for a board
 */
class BoardGeometry {

    constructor(data, width, height) {
        this.data = data;
        this.width = width;
        this.height = height;
    }

    compute(x, y) {
        // TODO
    }

    getData(x, y, w, h) {
        var topLeftViewport = this.compute(0, 0);
        var bottomRightViewport = this.compute(this.width, this.height);
        var topLeftBlock = this.compute(x, y);
        var bottomRightBlock = this.compute(x + w, y + h);

        console.log(topLeftViewport, bottomRightViewport, topLeftBlock, bottomRightBlock);
    }

}

class ZoomableGeometry {

    constructor(baseGeometry) {
        this.baseGeometry_ = baseGeometry;
        this.zoomRatio_ = 1;
    }

    zoomIn() {
        this.zoomRatio = Math.min(1, this.zoomRatio + 0.1);
    }

    zoomOut() {
        this.zoomRatio = Math.max(0.2, this.zoomRatio - 0.1);
    }

    compute(x, y) {
        super.compute(Math.floor(x * this.zoomRatio), Math.floor(y * this.zoomRatio));
    }
    
}

/**
 *  Allow panning and zooming
 */
class PanableGeometry extends BoardGeometry {

    constructor(baseGeometry) {
        this.baseGeometry_ = baseGeometry;
        this.scrollTop_ = 0;
        this.scrollLeft_ = 0;
    }

    scrollDown() {
        this.scrollTop_ += 10;
    }

    scrollUp() {
        this.scrollTop_ -= 10;
    }

    scrollRight() {
        this.scrollLeft_ -= 10;
    }

    scrollLeft() {
        this.scrollLeft_ += 10;
    }

    compute(x, y) {
        this.baseGeometry_.compute(x + this.scrollLeft_, y + this.scrollTop_);
    }

}

/**
 *  Renders a board in canvas
 */
class BoardRenderer {
    constructor($element) {

    }

    render(geo, cells) {
        var rect = this.computeRect_(cells);
        var data = geo.getData();

        // TODO
    }

    computeRect_(cells) {
        // TODO
        
        if (cells) {
            return {};
        }

        return {};
    }
}

ngModule.directive('board', function(rx, geometryFactory) {
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

ngModule.directive('panable', function(geometryFactory) {
    return {
        restrict: 'C',
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModel) {
            ngModel.$parsers.push(geometryFactory.createPanableGeometry);
            ngModel.$formatters.push(geo => geo && geo.baseGeometry);
        }
    };
});

ngModule.directive('zoomable', function(geometryFactory) {
    return {
        restrict: 'C',
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModel) {
            ngModel.$parsers.push(geometryFactory.createZoomableGeometry);
            ngModel.$formatters.push(geo => geo && geo.baseGeometry);
        }
    };
});