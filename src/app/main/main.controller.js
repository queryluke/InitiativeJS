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
      
        vm.takeTurn = function takeTurn(player){
            player.turnTaken = !player.turnTaken;
            saveBoard();
        }

        vm.wound = function wound(player,wound){
            wound = wound < 0 ? 0 : wound;
            wound = wound > 3 ? 3 : wound;
            player.wound = wound;
            saveBoard();
        }
        
        vm.hitMe = function hitMe(p,dmg){
            //$log.log(dmg)
            if(dmg !== undefined){
                dmg = dmg.split('-');
                var attack = dmg[0],
                    ap = dmg[1] === undefined ? 0 : dmg[1],
                    armor = p.attributes2[findIndexByKeyValue(p.attributes2,'name','armor')].value,
                    toughness = p.attributes2[findIndexByKeyValue(p.attributes2,'name','toughness')].value,
                    resultingArmor = armor - ap < 0 ? 0 : armor - ap,
                    finalToughness = parseInt(toughness) + resultingArmor,
                    result = attack - finalToughness,
                    success = result >= 0 ? 1 : 0,
                    overkill = result > 0 ? Math.floor(result / 4) : 0;
            
                /*p.damageLog += '<p>Took <strong>'+dmg[0]+'</strong> attack';
                if(dmg[1].length){
                    p.damageLog += ' with <em>'+dmg[1]+' armor piercing</em></p>';
                } else {
                    p.damageLog += '.</p>'
                }
                
                p.damageLog += '<p>Armor Soaked'*/
                
                if(success == 1){
                    if(p.shaken == 1){
                        if(p.type == 'wildcard'){
                            var wounds = success + overkill + p.wound;
                            wounds = wounds > 3 ? 3 : wounds;
                            p.wound = wounds;
                        }
                        if(p.type == 'extras'){
                            p.amount = p.amount - 1;
                        }
                    } else {
                        var wounds = overkill + p.wound;
                        wounds = wounds > 3 ? 3 : wounds;
                        p.shaken = 1;
                        p.wound = wounds;
                    }
                } else {
                    p.noDamage = 1;
                } 
            }
        }
        
        function findIndexByKeyValue(arraytosearch, key, valuetosearch) {
            for (var i = 0; i < arraytosearch.length; i++) {
                if (arraytosearch[i][key] == valuetosearch) {
                    return i;
                }
            }
            return null;
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
      
        vm.open = function(size,player){
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
        
        vm.damageLog = function(player){
            var dmgInstance = $uibModal.open({
                templateUrl: 'app/damageLog/damageLog.html',
                controller: 'DamageLogController',
                controllerAs: 'damageLog',
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
                    v.damageLog = '';
                    v.turnTaken = 0;
                    if(v.type == 'extras'){
                        if(v.amountOrigin === undefined){
                            v.amountOrigin = v.amount;
                        }
                    }
                });
                saveBoard();
                setMessage();
            }
        }
      
        init();
      

  }
})();
