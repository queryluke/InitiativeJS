(function() {
    'use strict';

    angular
        .module('InitiativeJS')
        .controller('DamageLogController', DamageLogController);

    /** @ngInject */
    function DamageLogController($uibModalInstance,char) {
        //$cookies.remove('char');
        var vm = this;
        
        vm.p = char;

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        
    }
})();