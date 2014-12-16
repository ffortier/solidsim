'use strict';

import {m1} from './components';
import {m2} from './controllers';

export var app = angular.module('app', [m1.name, m2.name]);