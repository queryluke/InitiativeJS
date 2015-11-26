(function() {
  'use strict';

  angular
    .module('InitiativeJS')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
