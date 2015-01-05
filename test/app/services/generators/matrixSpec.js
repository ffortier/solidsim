'use strict';

import Matrix from '../../../../src/app/services/generators/matrix';

describe('matrix', function() {
    var matrix;

    beforeEach(function() {
        matrix = new Matrix(10, 10, 3, (x, y) => 5);
    });

    it('should iterate through a subset of cells', function() {
        let arr = [];
        let uniq = (arr, val) => (~arr.indexOf(val) ? arr : arr.push(val) && arr);

        for (let cell of matrix.inRange(2, 2, 4, 4)) {
            arr.push(cell);
        }

        expect(arr.length).toBe(9);
        expect(arr.map(p => p.depth).reduce(uniq, [])).toEqual([5]);
        expect(arr.map(p => p.water).reduce(uniq, [])).toEqual([0]);
    });
});