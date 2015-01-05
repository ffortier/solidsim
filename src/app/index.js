'use strict';

import appComponents from './components';
import appControllers from './controllers';
import angular from 'angular';

export default angular.module('app', [appComponents.name, appControllers.name]);