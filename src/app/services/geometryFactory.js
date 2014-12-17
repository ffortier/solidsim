'use strict';

import { BoardGeometry } from './geometry/boardGeometry';
import { PanableGeometry } from './geometry/panableGeometry';
import { ZoomableGeometry } from './geometry/zoomableGeometry';

class GeometryFactory {
    createGeometry(data) {
        return data && new BoardGeometry(data);
    }
    
    createPanableGeometry(baseGeometry) {
        return baseGeometry && new PanableGeometry(baseGeometry);
    }

    createZoomableGeometry(baseGeometry) {
        return baseGeometry && new ZoomableGeometry(baseGeometry);
    }
}

angular.module('appServices').service('geometryFactory', GeometryFactory);
