'use strict';

import updateHandler from './updateHandler';

class Coco {

}

class Caca extends Coco {

}

self.onmessage = function(e) {
    self.onmessage = updateHandler(e.data);
    self.postMessage('initialized');
};
