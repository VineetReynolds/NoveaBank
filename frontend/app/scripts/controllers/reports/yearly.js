'use strict';

/**
 * @ngdoc function
 * @name noveaBankApp.controller:ReportsYearlyCtrl
 * @description
 * # ReportsYearlyCtrl
 * Controller of the noveaBankApp
 */
angular.module('noveaBankApp')
  .controller('ReportsYearlyCtrl', function ($scope, yearlyStatementResource) {
    $scope.currentPage =1;
    $scope.statementLines = yearlyStatementResource.queryAll({'customerId':auth.authz.idTokenParsed.sub});
  });
