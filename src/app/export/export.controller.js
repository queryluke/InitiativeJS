(function() {
    'use strict';

    angular
        .module('InitiativeJS')
        .controller('ExportController', ExportController);

    /** @ngInject */
    function ExportController($scope, $localStorage) {
        var vm = this;
        vm.characters = angular.toJson($localStorage.char);
    }
})();