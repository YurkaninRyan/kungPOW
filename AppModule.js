
var app = angular.module("kungPowApp", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
      	templateUrl: './app.html',
        controller: 'AppController'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

app.controller('AppController', function($scope) {
	
});
