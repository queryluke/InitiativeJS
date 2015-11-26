(function() {
    'use strict';

    describe('service Character', function() {
        var Character;

        beforeEach(module('InitiativeJS'));
        beforeEach(inject(function(_Character_) {
            Character = _Character_;
        }));

        it('should be registered', function() {
            expect(Character).not.toEqual(null);
        });

        describe('getCharacter function', function() {
            it('should exist', function() {
                expect(Character.getCharacter).not.toEqual(null);
            });

            it('should return array of object', function() {
                var char = Character.getCharacter();
                expect(char).toEqual(jasmine.any(Array));
                expect(char[0]).toEqual(jasmine.any(Object));
                expect(char.length > 2).toBeTruthy();
            });
        });
    });
})();