angular.module('app').controller('app_loginconfident', app_loginconfident);
function app_loginconfident($scope, app, $q) {
    'use strict';
    app.init($scope);
    
    $scope.test = function()
    {
        $http({
            method: 'POST',
            url: 'http://localhost:51350/#!/api/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {username: $scope.data.username, password: $scope.data.password,rememberMe: true}
        }).then(function successCallback(response) {
            var decoded = jwt_decode(response.data.accessToken);
            $sessionStorage.put('accessToken',response.data.accessToken);
            $sessionStorage.put('authenticated',true);
            $sessionStorage.put('user',decoded.sessionUser);
            $sessionStorage.put('siteGuid',decoded.sessionDefaultSite);
            $sessionStorage.put('userRoles',decoded.sessionUserRoles);
            alert('succesfully');
        }, function errorCallback(response) {
            alert('error');
        });

    };

}