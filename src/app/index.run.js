(function() {
  'use strict';

  angular
    .module('InitiativeJS')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
