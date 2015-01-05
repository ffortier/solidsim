'use strict';

import app from './app/index.js';
import angular from 'angular';

angular.element(document).ready(() => angular.bootstrap(document, [app.name]));
