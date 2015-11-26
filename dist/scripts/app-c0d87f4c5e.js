!function(){"use strict";angular.module("initiativeJs",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngRoute","ui.bootstrap","ngStorage"])}(),function(){"use strict";function a(){function a(a,t,n){t.isActive=function(t){return t===a.path()}}var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:a,controllerAs:"nav",bindToController:!0};return a.$inject=["$location","$scope","$log"],t}angular.module("initiativeJs").directive("navbar",a)}(),function(){"use strict";function a(a,t,n){function i(){o.deck=n.deck,o.players=n["char"],angular.isUndefined(o.deck)&&o.reshuffle(),angular.isUndefined(o.players)&&(o.players=[]),e()}function e(){o.deck.length<o.players.length?o.message="You need to reshuffle":o.message=o.deck.length+" cards left"}function s(){var a=Math.floor(Math.random()*o.deck.length),t=o.deck[a];return o.deck.splice(a,1),t}function l(){n.deck=o.deck,n["char"]=o.players}var o=this;o.deck=[],o.players=[],o.reshuffle=function(){o.deck=[];for(var a=1;54>=a;a++)o.deck.push(a);n.deck=o.deck,e()},o.discard=function(a){a.initiative=s(),l()},o.shake=function(a){a.shaken=!a.shaken,l()},o.showStats=function(a){a.showStats=!a.showStats},o.takeTurn=function(a){a.turnTaken=!a.turnTaken},o.wound=function c(a,c){a.wound=c,l()},o.deal=function(){o.deck.length<o.players.length?e():(angular.forEach(o.players,function(a,t){a.initiative=s(),a.turnTaken=0}),l(),e())},i()}angular.module("initiativeJs").controller("MainController",a),a.$inject=["$log","$scope","$localStorage"]}(),function(){"use strict";function a(a,t,n,i){var e=this;e.importCharacters=function(a){i["char"]=angular.fromJson(a)}}angular.module("initiativeJs").controller("ImportController",a),a.$inject=["$scope","$cookies","$log","$localStorage"]}(),function(){"use strict";function a(a,t){var n=this;n.characters=angular.toJson(t["char"])}angular.module("initiativeJs").controller("ExportController",a),a.$inject=["$scope","$localStorage"]}(),function(){"use strict";function a(a,t,n,i,e,s){function l(){s["char"]=r.characters,r["char"]=o()}function o(){var a={edge:[],attributes:[{name:"agility",value:"4"},{name:"smarts",value:"4"},{name:"strength",value:"4"},{name:"spirit",value:"4"},{name:"vigor",value:"4"}],attributes2:[{name:"Charisma",value:"0"},{name:"Pace",value:"0"},{name:"Parry",value:"0"},{name:"Toughness",value:"0"}],skills:[]};return a}function c(){var a=s["char"];return angular.isUndefined(a)?[]:a}var r=this;r["char"]=o(),r.params=i,r.characters=c(),e.get("/data/skills.json").success(function(a){r.skills=a.result}),r.update=function(a,t){var n=r.characters.indexOf(a),i=angular.copy(a),e=angular.isUndefined(i.name);e!==!0&&(i.type=r.params.type,n>=0?r.characters[n]=i:r.characters.push(i),l())},r.change=function(a,t,n){1==n?r["char"][t].push(a):r["char"][t]=a},r.removeTrait=function(a,t){r["char"][a].splice(t,1)},r.remove=function(a){var t=r.characters.indexOf(a);r.characters.splice(t,1),l()},r.edit=function(a){r["char"]=a}}angular.module("initiativeJs").controller("AddController",a),a.$inject=["$scope","$cookies","$log","$routeParams","$http","$localStorage"]}(),function(){"use strict";function a(a){a.debug("runBlock end")}angular.module("initiativeJs").run(a),a.$inject=["$log"]}(),function(){"use strict";function a(a){a.when("/",{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).when("/add/:type",{templateUrl:"app/add/add.html",controller:"AddController",controllerAs:"add"}).when("/export",{templateUrl:"app/export/export.html",controller:"ExportController",controllerAs:"export"}).when("/import",{templateUrl:"app/import/import.html",controller:"ImportController",controllerAs:"import"}).otherwise({redirectTo:"/"})}angular.module("initiativeJs").config(a),a.$inject=["$routeProvider"]}(),function(){"use strict";angular.module("initiativeJs")}(),function(){"use strict";function a(a){a.debugEnabled(!0)}angular.module("initiativeJs").config(a),a.$inject=["$logProvider"]}(),angular.module("initiativeJs").run(["$templateCache",function(a){a.put("app/add/add.html",'<div class="container"><div><navbar></navbar></div><div class="row"><div class="col-xs-12"><h2>Add {{add.params.type}}</h2></div><div class="col-sm-9"><div class="player-input well"><div class="row"><div class="form-group col-xs-8"><label for="player-name">Name</label> <input type="text" class="form-control player-input" id="player-name" ng-model="add.char.name" value=""></div><div class="col-xs-4 text-right"><button class="btn btn-info" ng-click="add.update(add.char)" title="save"><span class="glyphicon glyphicon-floppy-disk"></span></button></div></div><div class="row"><div class="col-xs-6"><div class="row"><div class="form-group col-xs-12" ng-repeat="stat in add.char.attributes track by $index"><label for="player-{{stat.name}}" class="text-capitalize">{{stat.name}}</label><select class="form-control" id="player-{{stat.name}}" ng-model="add.char.attributes[$index].value"><option value="4">d4</option><option value="6">d6</option><option value="8">d8</option><option value="10">d10</option><option value="12">d12</option></select></div></div></div><div class="col-xs-6"><div class="row"><div class="form-group col-xs-12" ng-repeat="stat in add.char.attributes2 track by $index"><label for="player-{{stat.name}}" class="text-capitalize">{{stat.name}}</label> <input type="text" class="form-control player-input" id="player-{{stat.name}}" ng-model="add.char.attributes2[$index].value"></div><div class="form-group col-xs-12"><label for="player-quick">Quick</label> <input type="checkbox" id="player-quick" ng-model="add.char.quick" value="1"></div></div></div></div><div class="row"><div class="col-xs-12"><h4>Skills</h4><div class="row"><div class="col-xs-12"><div class="row" ng-repeat="skill in add.char.skills track by $index"><div class="col-xs-5">{{ skill.name }}</div><div class="col-xs-3"><select class="form-control" ng-model="add.char.skills[$index].value"><option value="4">d4</option><option value="6">d6</option><option value="8">d8</option><option value="10">d10</option><option value="12">d12</option></select></div><div class="col-xs-2"><input type="text" class="form-control" ng-model="add.char.skills[$index].plus"></div><div class="col-xs-2"><button ng-click="add.removeTrait(\'skills\',$index)" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></div></div></div></div><h4>Add New Skill</h4><div class="row"><div class="col-xs-12"><select class="form-control" ng-model="charSkill" ng-options="skill.name for skill in add.skills | orderBy: \'name\'" ng-change="add.change(charSkill,\'skills\',1)"></select></div></div><h4>Notes</h4><textarea class="form-control" ng-model="add.char.notes"></textarea></div></div></div></div><div class="col-sm-3"><h4 class="text-capitalize">{{add.params.type}} List</h4><table class="table"><thead><tr><th>Edit</th><th>Name</th><th>Delete</th></tr></thead><tbody><tr ng-repeat="player in add.characters | filter:{type: add.params.type}"><td><button ng-click="add.edit(player)" class="btn btn-info"><span class="glyphicon glyphicon-pencil"></span></button></td><td>{{ player.name }}</td><td><button ng-click="add.remove(player)" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td></tr></tbody></table></div></div></div><pre> cookie = {{ add.characters | json }} </pre>'),a.put("app/export/export.html",'<div class="container"><pre>{{ export.characters }}</pre></div>'),a.put("app/import/import.html",'<div class="container"><div><navbar></navbar></div><div class="row"><h3>Enter a well formed json string from the export below</h3><h4>This will override any players currently in the system!</h4><textarea ng-model="charImport" class="form-control"></textarea> <button class="btn btn-default" ng-click="import.importCharacters(charImport)">Import</button></div></div>'),a.put("app/main/main.html",'<div class="container"><div><navbar></navbar></div><div class="row"><div id="deck-container" class="col-md-12"><div class="row"><div class="col-sm-3 col-md-offset-1"><button class="btn btn-primary btn-lg" id="deal-cards" ng-click="main.deal()">Deal</button></div><div class="col-sm-4 text-center"><h4 id="dealt-card-output">{{ main.message }}</h4></div><div class="col-sm-4 col-md-3"><button class="btn btn-danger btn-lg pull-right" id="reshuffle" ng-click="main.reshuffle()">Reshuffle</button></div></div></div></div><div class="row"><div ng-repeat="(id,p) in main.players | orderBy: \'initiative\' track by id" class="col-xs-12 col-sm-4"><div class="well" ng-class="{\'shaken\': p.shaken > 0, \'wound-1\': p.wound >= 1, \'wound-2\': p.wound >= 2, \'wound-3\': p.wound == 3, \'joker\':p.initiative < 3, \'turn-taken\':p.turnTaken == 1}"><div class="row"><div class="col-xs-8"><h4>{{p.name }}</h4></div><div class="col-xs-4 text-right"><h4><div ng-show="p.quick == true"><button type="button" class="btn btn-info btn-sm" data-ng-if="p.initiative > 34" ng-click="main.discard(p)"><span class="glyphicon glyphicon-repeat"></span></button> {{p.initiative}}</div><div ng-hide="p.quick == true">{{p.initiative}}</div></h4></div></div><div class="row"><div class="col-xs-6"><ul class="list-unstyled list-inline"><li ng-if="p.shaken != 1">&nbsp;</li><li ng-if="p.shaken == 1"><span class="glyphicon glyphicon-flash"></span><span class="glyphicon glyphicon-flash"></span><span class="glyphicon glyphicon-flash"></span></li></ul></div><div class="col-xs-6 text-right" ng-if="p.initiative < 3">JOKER!!!</div></div><div class="row"><div class="col-xs-6"><ul class="list-unstyled"><li ng-repeat="stat in p.attributes"><strong class="text-capitalize">{{stat.name}}</strong>: d{{stat.value}}</li></ul></div><div class="col-xs-6"><ul class="list-unstyled"><li ng-repeat="stat in p.attributes2"><strong class="text-capitalize">{{stat.name}}</strong>: d{{stat.value}}</li></ul></div></div><div class="row"><div class="col-xs-6"><button type="button" class="btn btn-primary btn-sm" ng-click="main.showStats(p)">Skills</button></div><div class="col-xs-6"><button type="button" class="btn btn-success btn-sm" ng-click="main.takeTurn(p)">End Turn</button></div><div class="col-xs-12"><div ng-show="p.showStats != 1"><ul><li ng-repeat="skill in p.skills"><strong class="text-capitalize">{{skill.name}}</strong>: d{{skill.value}} <span ng-if="skill.plus > 0">+ {{skill.plus}}</span></li></ul></div></div></div><div class="row"><div class="col-xs-12"><h5>Notes</h5><p class="player-notes">{{p.notes}}</p></div></div><div class="row"><div class="col-xs-9"><h5>Wounds:</h5><button type="button" ng-click="main.wound(p,0)" ng-class="{active: p.wound == 0}" class="btn btn-primary btn-sm" data-toggle="button" aria-pressed="false" autocomplete="off">0</button><div class="btn-group"><button type="button" ng-click="main.wound(p,1)" ng-class="{active: p.wound >= 1}" class="btn btn-danger btn-sm" data-toggle="button" aria-pressed="false" autocomplete="off">1</button> <button type="button" ng-click="main.wound(p,2)" ng-class="{active: p.wound >= 2}" class="btn btn-danger btn-sm" data-toggle="button" aria-pressed="false" autocomplete="off">2</button> <button type="button" ng-click="main.wound(p,3)" ng-class="{active: p.wound == 3}" class="btn btn-danger btn-sm" data-toggle="button" aria-pressed="false" autocomplete="off">3</button></div></div><div class="col-xs-3"><h5>&nbsp;</h5><button type="button" ng-click="main.shake(p)" ng-class="{active: p.shaken == 1}" class="btn btn-warning btn-sm pull-right" data-toggle="button" aria-pressed="false" autocomplete="off"><span class="glyphicon glyphicon-flash"></span> Shaken</button></div></div></div></div></div></div>'),a.put("app/components/formGenerator/text.html",'<div class="form-group"><label for="player-name">Name</label> <input type="text" class="form-control player-input" id="player-name" ng-model="char.name" value=""></div>'),a.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" ng-href="#/" ng-class="{ active: isActive(\'/\')}"><span class="glyphicon glyphicon-home"></span> InitiativeJS</a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav"><li ng-class="{ active: isActive(\'/add/player\')}"><a ng-href="#/add/player">Add Players</a></li><li ng-class="{ active: isActive(\'/add/npc\')}"><a ng-href="#/add/npc">Add NPCs</a></li><li ng-class="{ active: isActive(\'/export\')}"><a ng-href="#/export">Export Players</a></li><li ng-class="{ active: isActive(\'/import\')}"><a ng-href="#/import">Import Players</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"></ul></div></div></nav>')}]);
//# sourceMappingURL=../maps/scripts/app-c0d87f4c5e.js.map
