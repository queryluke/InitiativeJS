(function() {
    'use strict';

    angular
        .module('InitiativeJS')
        .controller('AddController', AddController);

    /** @ngInject */
    function AddController($scope,$cookies,$log,$routeParams,$http,$localStorage) {
        //$cookies.remove('char');
        var vm = this;
        
        vm.char = newChar();

        vm.params = $routeParams;
        vm.characters = getCharacters();

        //Edges
        /*$http.get('https://sheetsu.com/apis/1a423ff5').success(function(data) {
            if(data['status'] == '200'){
                vm.edges = data['result'];
            } else {
                vm.edges = $http.get('/data/edges.json');
            }
        });*/
        //Skills
        $http.get('https://sheetsu.com/apis/40b023c5').success(function(data) {
            vm.skills = data['result'];
        });
        /*$http.get('../data/skills.json').success(function(data) {
            vm.skills = data['result'];
            //$log.log(data['result']);
        });*/

        vm.update = function(char,type){
            //vm.remove(char);
            var index = vm.characters.indexOf(char);
            var character = angular.copy(char);
            var hasName = angular.isUndefined(character.name);
            if(hasName !== true){
                character.type = vm.params.type;
                if(index >= 0){
                    vm.characters[index] = character;
                } else {
                    vm.characters.push(character);
                }
                setCharacters();
            }
        };

        vm.change = function(what,prop,multi){
            if(multi == 1){
                vm.char[prop].push(what);
            } else {
                vm.char[prop] = what;
            }
        };

        vm.removeTrait = function(prop,index){
            vm.char[prop].splice(index,1);
        }

        vm.remove = function(char){
            //$log.log(char);
            var index = vm.characters.indexOf(char);
            vm.characters.splice(index,1);
            setCharacters();
        };

        vm.edit = function(char){
            vm.char = char;
            //vm.char = vm.characters[$index];
        }

        function setCharacters(){
            //$cookies.putObject('char',vm.characters);
            $localStorage.char = vm.characters;
            vm.char = newChar();
        }

        function newChar(){
            var char = {
                'edge':[],
                'attributes': [
                    {'name':'agility','value':'4'},
                    {'name':'smarts','value':'4'},
                    {'name':'strength','value':'4'},
                    {'name':'spirit','value':'4'},
                    {'name':'vigor','value':'4'}
                ],
                'attributes2': [
                    {'name':'Charisma','value':'0'},
                    {'name':'Pace','value':'0'},
                    {'name':'Parry','value':'0'},
                    {'name':'Toughness','value':'0'}
                ],
                'skills': []
            };
            return char;
        }

        function getCharacters(){
            //var characters = $cookies.getObject('char');
            var characters = $localStorage.char;
            if(angular.isUndefined(characters)){
                return [];
            } else {
                return characters;
            }
        }
        
        //$scope.char = vm.char;

        //$log.log(vm.cookieChar);
    }
})();