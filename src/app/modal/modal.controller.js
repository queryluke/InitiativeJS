(function() {
    'use strict';

    angular
        .module('InitiativeJS')
        .controller('ModalController', ModalController);

    /** @ngInject */
    function ModalController($uibModalInstance,char) {
        //$cookies.remove('char');
        var vm = this;
        
        vm.p = char;

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        
    }
})();