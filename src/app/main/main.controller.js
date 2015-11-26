(function() {
  'use strict';

  angular
    .module('InitiativeJS')
    .controller('MainController', MainController);

  /** @ngInject */
    function MainController($log,$scope,$localStorage,$uibModal) {
        
        var vm = this;
      
        vm.deck = [];
        vm.players= [];

        vm.reshuffle = function reshuffle(){
            vm.deck = [];
            for (var i = 1; i <= 54; i++) {
                vm.deck.push(i);
            }
          
            $localStorage.deck = vm.deck;
            setMessage();
        }

        vm.discard = function discard(player){
            player.initiative = dealCard();
            saveBoard();
        }

        vm.shake = function shake(player){
            player.shaken = !player.shaken;
            saveBoard();
        }
      
        vm.showStats = function showStats(player){
            player.showStats = !player.showStats;
        }
      
        vm.showChar = function showChar(player){
            player.showChar = !player.showChar;
        }
      
        vm.takeTurn = function takeTurn(player){
            player.turnTaken = !player.turnTaken;
            saveBoard();
        }

        vm.wound = function wound(player,wound){
            player.wound = wound;
            saveBoard();
        }

        function init(){
            vm.deck = $localStorage.deck;
            vm.players = $localStorage.char;
            if(angular.isUndefined(vm.deck)){
                vm.reshuffle();
            }
            if(angular.isUndefined(vm.players)){
                vm.players = [];
            }
            setMessage();
        }

        function setMessage(){
            if(vm.deck.length < vm.players.length){
                vm.message = 'You need to reshuffle';
            } else {
                vm.message = vm.deck.length + ' cards left';
            }
        }

        function dealCard(){
            var key = Math.floor(Math.random() * vm.deck.length);
            var card = vm.deck[key];
            vm.deck.splice(key,1);
            return card;
        }

        function saveBoard(){
            $localStorage.deck = vm.deck;
            $localStorage.char = vm.players;
        }
      
        vm.open = function (size,player){
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modal/modal.html',
                controller: 'ModalController',
                controllerAs: 'charModal',
                size: size,
                resolve: {
                    char: function () {
                        return player;
                    }
                }
            });
        }


        vm.deal = function deal(){
            if(vm.deck.length < vm.players.length){
                setMessage();
            } else {
                angular.forEach(vm.players, function(v,k){
                    v.initiative = dealCard();
                    v.turnTaken = 0;
                    v.showStats = 0;
                    v.showChar = 0;
                });
                saveBoard();
                setMessage();
            }
        }
      
        init();
      

  }
})();
