// --------------------------------------------------------------------------------------------------------------------
// <summary>
//   Desc: Module for the Ticket list
//   Author: Syed
// </summary>
// ---------------
var ticketApp = angular.module('ticketApp', ['ngRoute', 'ui-rangeSlider', 'angular-highlight'])
.config(['$routeProvider', function ($routeProvider) {
   
    $routeProvider
       .when('/ticket', {
           templateUrl: 'Views/ticketgenerate.html',
           controller: 'ticketController'
       })
       .when('/login', {
           templateUrl: 'Views/login.html',
           controller: 'loginController'
   })
   .otherwise({ redirectTo: '/' })
   
}])
.controller('mainController', function ($scope, $timeout) {
    $scope.message = "Main Content";

    $scope.hideLabel = function() {
        $timeout(function () { $scope.hideLabel = false; }, 0000);
    };
    $scope.onLoad = function () {
        $timeout(function () { $scope.hideLabel = false; $('.newloader').hide();}, 3000);
    };
    $scope.onLoad();
})
.filter('rangeFilter', function () {
    return function (items, rangeInfo) {
        var filtered = items;
        var min = parseInt(rangeInfo.min);
        var max = parseInt(rangeInfo.max);
        // If time is with the range
        angular.forEach(items, function (item) {
            //if (item.CONFIDENCE_LEVEL > 0)
            //{
            if (item.CONFIDENCE_LEVEL >= min && item.CONFIDENCE_LEVEL <= max) {
                //filtered.push(item);
                item.ISCHECKED = true;
            }
            else
            {
                item.ISCHECKED = false;
            }
            //}
        });
        return filtered;
    };
})
.filter('unique', function () { //to filter unique values

        return function (items, filterOn) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }

                });
                items = newItems;
            }
            return items;
        };
    });

