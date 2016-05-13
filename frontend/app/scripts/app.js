'use strict';

/**
 * @ngdoc overview
 * @name noveaBankApp
 * @description
 * # noveaBankApp
 *
 * Main module of the application.
 */

var module = angular.module('noveaBankApp', []);

var auth = {};
var logout = function(){
  console.log('*** LOGOUT');
  auth.loggedIn = false;
  auth.authz = null;
  window.location = auth.logoutUrl;
};

angular
  .module('noveaBankApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('Auth', function () {
      return auth;
    })
    .factory('authInterceptor', function ($q, Auth) {
      return {
        'request': function (config) {
          var deferred = $q.defer();
          if (Auth.authz.token) {
            Auth.authz.updateToken(5).success(function () {
              config.headers = config.headers || {};
              config.headers.Authorization = 'Bearer ' + Auth.authz.token;

              deferred.resolve(config);
            }).error(function () {
              deferred.reject('Failed to refresh token');
            });
          }
          return deferred.promise;
        }
      };
    })
    .factory('errorInterceptor', function ($q) {
      return {
        'responseError': function (rejection) {
          if (rejection.status == 401) {
            console.log('session timeout?');
            logout();
          } else if (rejection.status == 403) {
            alert("Forbidden");
          } else if (rejection.status == 404) {
            alert("Not found");
          } else if (rejection.status) {
            if (rejection.data && rejection.data.errorMessage) {
              alert(rejection.data.errorMessage);
            } else {
              alert("An unexpected server error has occurred");
            }
          }
          return $q.reject(rejection);
        }
      };
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('errorInterceptor');
      $httpProvider.interceptors.push('authInterceptor');
    });


angular.element(document).ready(function ($http) {
  var keycloakAuth = new Keycloak('keycloak.json');
  auth.loggedIn = false;

  keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
    auth.loggedIn = true;
    auth.authz = keycloakAuth;
    auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/NoveaBank/protocol/openid-connect/logout?redirect_uri=http://localhost:9000/";
    angular.bootstrap(document, ['noveaBankApp']);
  }).error(function () {
    window.location.reload();
  });

});