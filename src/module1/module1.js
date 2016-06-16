(function () {
    'use strict';
    var appMod = angular.module('Mod1',['ui.bootstrap']);


        appMod.factory('IdentityService', function () {
            return {
                first_name: 'John',
                last_name: 'Doe'
            };
        });

        appMod.controller('IdentityCtrl', function IdentityCtrl(IdentityService){
            _.assign(this,IdentityService);
            //this.first_name = 'lala';
            //console.log(IdentityService);

        });
}());





