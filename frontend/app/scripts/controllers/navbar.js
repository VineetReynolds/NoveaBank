'use strict';

/**
 * @ngdoc function
 * @name noveaBankApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the noveaBankApp
 */
angular.module('noveaBankApp')
  .controller('NavbarCtrl', function ($scope) {
    $scope.logout = logout;
  });
