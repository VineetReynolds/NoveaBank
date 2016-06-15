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
    'ngTouch',
    'ui.bootstrap',
    'angularUtils.directives.dirPagination'
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
      .when('/contacts/new', {
        templateUrl: 'views//contacts/new.html',
        controller: 'ContactsNewCtrl',
        controllerAs: '/contacts/new'
      })
      .when('/contacts/view', {
        templateUrl: 'views/contacts/view.html',
        controller: 'ContactsViewCtrl',
        controllerAs: 'contacts/view'
      })
      .when('/contacts/edit/:contactId', {
        templateUrl: 'views/contacts/edit.html',
        controller: 'ContactsEditCtrl',
        controllerAs: 'contacts/edit'
      })
      .when('/transactions/deposits/new', {
        templateUrl: 'views/transactions/deposits/new.html',
        controller: 'TransactionsDepositsNewCtrl',
        controllerAs: 'transactions/deposits/new'
      })
      .when('/transactions/withdrawals/new', {
        templateUrl: 'views/transactions/withdrawals/new.html',
        controller: 'TransactionsWithdrawalsNewCtrl',
        controllerAs: 'transactions/withdrawals/new'
      })
      .when('/transactions/payments/new', {
        templateUrl: 'views/transactions/payments/new.html',
        controller: 'TransactionsPaymentsNewCtrl',
        controllerAs: 'transactions/payments/new'
      })
      .when('/reports/monthly', {
        templateUrl: 'views/reports/monthly.html',
        controller: 'ReportsMonthlyCtrl',
        controllerAs: 'reports/monthly'
      })
      .when('/reports/yearly', {
        templateUrl: 'views/reports/yearly.html',
        controller: 'ReportsYearlyCtrl',
        controllerAs: 'reports/yearly'
      })
      .when('/reports/custom', {
        templateUrl: 'views/reports/custom.html',
        controller: 'ReportsCustomCtrl',
        controllerAs: 'reports/custom'
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
            console.log("Forbidden");
          } else if (rejection.status == 404) {
            console.log("Not found");
          } else if (rejection.status) {
            if (rejection.data && rejection.data.errorMessage) {
              console.log(rejection.data.errorMessage);
            } else {
              console.log("An unexpected server error has occurred");
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


angular.element(document).ready( function() {
  var keycloakAuth = new Keycloak('keycloak.json');
  auth.loggedIn = false;

  keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
    auth.loggedIn = true;
    auth.authz = keycloakAuth;
    auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/NoveaBank/protocol/openid-connect/logout?redirect_uri=http://192.168.99.100:30080/";
    angular.bootstrap(document, ['noveaBankApp']);
  }).error(function () {
    window.location.reload();
  });

});
