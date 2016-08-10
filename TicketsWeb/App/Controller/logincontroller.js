// --------------------------------------------------------------------------------------------------------------------
// <summary>
//   Desc: Controller to log into ticket page
//   Author: Syed
// </summary>
// --------------------------------------------------------------------------------------------------------------------
ticketApp.controller('loginController',
    ['$scope', '$rootScope', '$http', '$window','$location','ticketservice', 'htmlConstants',
function ($scope, $rootScope, $http, $window, $location, ticketservice,localStorageService, htmlConstants) {
    var userInfo;
    /// <summary>            
    /// Login functionality
    /// </summary>
    $scope.login = function (login) {
        //$('.loader').show();
        ticketservice.GetAuthorize(login.email, ConverttoHex(login.password)).then(function (data) {
            $scope.IsAuthorized = data;
            if ($scope.IsAuthorized === "true") {
                        userInfo = {
                            Email: login.email
                        };
                        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                        localStorage.setItem("email", userInfo.Email);

                        $location.path('/ticket');
                    }
                    else {
                        $scope.loginError = "Invalid username/password combination";
                    };
                    //$('.loader').hide();
            });
      
    };

    //Convert String to Hexa
    ConverttoHex = function (str) {
        var hex = "",
            i;
        for (i = 0; i < str.length; i++) {
            hex += ''.toString() + str.charCodeAt(i).toString(16);
        }
        return hex;
    };

}]);