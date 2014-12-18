'use strict';

import statistics from './statistics/statistics';

class StatisticsFactory {
    constructor($injector) {
        this.$injector = $injector;
    }

    create(game, $scope) {
        return this.$injector.invoke(statistics, null, { game, $scope });
    }
}

angular.module('appServices').service('statisticsFactory', StatisticsFactory);