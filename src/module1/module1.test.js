(function () {
    "use strict";
    describe('Mod1.IdentityService', function () {

        var IdentityService;

        beforeEach(module('Mod1'));
        beforeEach(inject(function ($injector) {
            IdentityService = $injector.get('IdentityService');
        }));

        it('Should output have correct default values', function () {
            expect(IdentityService.first_name).toBe('John');
            expect(IdentityService.last_name).toBe('Doe');

        });

    });

}());