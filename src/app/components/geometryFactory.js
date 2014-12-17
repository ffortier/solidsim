'use strict';

import { BoardGeometry } from './geometry/boardGeometry';
import { PanableGeometry } from './geometry/panableGeometry';
import { ZoomableGeometry } from './geometry/zoomableGeometry';

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

angular.module('appComponents').service('geometryFactory', GeometryFactory);
