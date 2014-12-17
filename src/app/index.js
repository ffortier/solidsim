'use strict';

import {appComponents} from './components';
import {appControllers} from './controllers';

export var app = angular.module('app', [appComponents.name, appControllers.name]);