'use strict';

/**
 * @ngdoc function
 * @name noveaBankApp.controller:ReportsMonthlyCtrl
 * @description
 * # ReportsMonthlyCtrl
 * Controller of the noveaBankApp
 */
angular.module('noveaBankApp')
  .controller('ReportsMonthlyCtrl', function ($scope, monthlyStatementResource) {
    $scope.currentPage =1;
    $scope.statementLines = monthlyStatementResource.queryAll({'customerId':auth.authz.idTokenParsed.sub});
  });
