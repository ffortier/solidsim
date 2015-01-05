'use strict';

import BoardGeometry from './geometry/boardGeometry';
import PanableGeometry from './geometry/panableGeometry';
import ZoomableGeometry from './geometry/zoomableGeometry';

function extendProto(baseGeo, Sub) {
    var F = function() {};
    F.prototype = baseGeo;
    var f = new F();
    angular.extend(f, Sub.prototype);
    Sub.call(f, baseGeo);
    return f;
}

class GeometryFactory {
    createGeometry(data) {
        return data && new BoardGeometry(data);
    }
    
    createPanableGeometry(baseGeometry) {
        if (baseGeometry) {
            return extendProto(baseGeometry, PanableGeometry);
        }
    }

    createZoomableGeometry(baseGeometry) {
        if (baseGeometry) {
            return extendProto(baseGeometry, ZoomableGeometry);
        }
    }
}

angular.module('appServices').service('geometryFactory', GeometryFactory);
