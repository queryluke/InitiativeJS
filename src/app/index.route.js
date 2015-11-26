(function() {
    'use strict';

    angular
        .module('InitiativeJS')
        .config(routeConfig);

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .when( '/add/:type', {
                templateUrl: 'app/add/add.html',
                controller: 'AddController',
                controllerAs: 'add'
            })
            .when( '/export', {
                templateUrl: 'app/export/export.html',
                controller: 'ExportController',
                controllerAs: 'export'
            })
            .when( '/import', {
                templateUrl: 'app/import/import.html',
                controller: 'ImportController',
                controllerAs: 'import'
            })
            .otherwise({
                redirectTo: '/'
            });
  }

})();
