// --------------------------------------------------------------------------------------------------------------------
// <summary>
//   Desc: Module for the Ticket list
//   Author: Syed
// </summary>
// ---------------
var ticketApp = angular.module('ticketApp', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
   
    $routeProvider
       .when('/ticket', {

           templateUrl: 'App/Views/ticketgenerate.html',
           controller: 'ticketController'
       })
   .when('/MainPage', {
       templateUrl: 'MainPage.html'
   })
   .otherwise({ redirectTo: '/' })

}])
.controller('mainController', function ($scope, $timeout) {
    $scope.message = "Main Content";

    $scope.hideLabel = function () {
        $timeout(function () { $scope.hideLabel = false; }, 3000);
    };
});