'use strict';

import Matrix from '../../../../src/app/services/generators/matrix';

describe('matrix', function() {
    var matrix;

    beforeEach(function() {
        matrix = new Matrix(10, 10, 3, (x, y) => 5);
    });

    it('should iterate through a subset of cells', function() {
        var arr = [];

        for (let cell of matrix.inRange(2, 2, 4, 4)) {
            arr.push(cell);
        }

        expect(arr.length).toBe(9);
    });
});