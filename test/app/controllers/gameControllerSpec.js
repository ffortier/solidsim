describe('GameController', function() {
    'use strict';

    var sc, toolFactory, gameGenerator, gameController;

    beforeEach(module('appControllers'));

    beforeEach(module(function($provide) {
        $provide.value('toolFactory', toolFactory = jasmine.createSpyObj('toolFactory', ['createAll']));
        $provide.value('gameGenerator', gameGenerator = jasmine.createSpyObj('gameGenerator', ['generate']));

        toolFactory.createAll.andReturn([{}]);
        gameGenerator.generate.andReturn({});
    }));

    beforeEach(inject(function($controller, $rootScope) {
        gameController = $controller('GameController', {
            $scope: sc = $rootScope.$new()
        });
    }));

    it('should create all the tools and generate a new game', inject(function() {
        expect(sc.game).toBeDefined();
        expect(sc.activeTool).toBeDefined();
    }));

});