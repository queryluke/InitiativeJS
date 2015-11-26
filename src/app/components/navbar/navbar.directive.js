(function() {
  'use strict';

  angular
    .module('InitiativeJS')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'nav',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($location,$scope,$log) {
      //$scope.isActive = $location.path();
      $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
    }
  }

})();
