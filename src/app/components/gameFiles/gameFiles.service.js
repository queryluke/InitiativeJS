
//This service will load game files

/*(function() {
    'use strict';

    angular
        .module('initiativeJs')
        .factory('gameFiles', gameFiles);
*/
    /** @ngInject */
/*    function gameFiles($http,$log) {

        var service = {
            getFile: getFile
        };

        return service;

        function getFile(file) {

            return $http.get('data/'+file+'.json')
                .then(getFileComplete)
                .catch(getFileFailed);

            function getFileComplete(response) {
                return response.data;
            }

            function getFileFailed(error) {
                $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
            }
        }
    }
})();*/
