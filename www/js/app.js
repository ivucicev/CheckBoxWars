// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.service('fbService', ['$firebaseAuth', '$firebaseObject', '$firebaseArray', function ($firebaseAuth, $firebaseObject, $firebaseArray) {
    const URL = 'https://checkboxwars.firebaseio.com/';
    var ref = new Firebase(URL);
    var auth = $firebaseAuth(ref);
    var data = $firebaseArray(ref);
    auth.$authWithPassword({
        email: "ivucicev@gmail.com",
        password: "AwSu.247"
    }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
        console.error("Authentication failed:", error);
    });
    var initial = new Array(5);
    return {
        initialArray: function() {
            for (var i = 0; i < 5; i++) {
                initial[i] = new Array(5);
            }
            console.log(initial[2][2]);
        },
        createGame: function(name) {

        },
        joinGame: function(gameID) {

        },
        createPlayer: function(playerName) {
            var that = this;
            data.$add({name: playerName}).then(function(res) {
                console.log(res);
                that.initialArray();
            }, function() {

            });
        }
    };
}])
.controller('GameController', ['$scope', 'fbService', function ($scope, fbService) {
    $scope.game = {};
    $scope.checkAndDisable = function(x, y) {
        $scope.game['status' + x + y] = 'iMissEnemy';
        fbService.createPlayer('ivan');
    };
}]);
