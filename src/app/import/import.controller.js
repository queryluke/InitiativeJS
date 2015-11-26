(function() {
    'use strict';

    angular
        .module('InitiativeJS')
        .controller('ImportController', ImportController);

    /** @ngInject */
    function ImportController($scope, $cookies, $log, $localStorage) {
        
        var vm = this;
        
        vm.importCharacters = function importCharacters(string){
            //$cookies.putObject('char',angular.fromJson(string));
            $localStorage.char = angular.fromJson(string);
        }
    }
})();