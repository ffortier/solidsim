'use strict';

import {app} from './app/index.js';

angular.element(document).ready(() => angular.bootstrap(document, [app.name]));
