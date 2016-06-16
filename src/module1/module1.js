(function () {
    "use strict";
    angular.module('Mod1',[])
        .factory('IdentityService', function () {
            return {
                first_name: 'John',
                last_name: 'Doe'
            };
        });
}());





