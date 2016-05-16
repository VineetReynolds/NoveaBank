'use strict';

/**
 * @ngdoc function
 * @name noveaBankApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the noveaBankApp
 */
angular.module('noveaBankApp')
  .controller('MainCtrl', function ($scope, customerResource) {
      customerResource.query({'customerId':auth.authz.idTokenParsed.sub}, function(response){
        $scope.authInfo = auth.authz.idTokenParsed;
        $scope.account = response.account;
      }, function(response) {
        console.log("Failed to locate customer in the backend.");
        logout();
      });
  });
