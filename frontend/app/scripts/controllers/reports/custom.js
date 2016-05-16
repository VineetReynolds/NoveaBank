'use strict';

/**
 * @ngdoc function
 * @name noveaBankApp.controller:ReportsCustomCtrl
 * @description
 * # ReportsCustomCtrl
 * Controller of the noveaBankApp
 */
angular.module('noveaBankApp')
  .controller('ReportsCustomCtrl', function ($scope, $location, flash, customStatementResource) {
    $scope.currentPage = 1;
    $scope.statementLines = [];

    $scope.generateReport = function() {
      if($scope.fromDate && $scope.toDate && ($scope.fromDate > $scope.toDate)) {
        flash.setMessage({'type':'danger','text':'From date cannot be later than To date.'}, true);
        return;
      }
      $scope.statementLines = customStatementResource.queryAll({'customerId':auth.authz.idTokenParsed.sub, 'fromDate': $scope.fromDate, 'toDate': $scope.toDate});
    };

    $scope.open = function($event, fromOrTo) {
      $event.preventDefault();
      $event.stopPropagation();

      if(fromOrTo == 'from') {
        $scope.fromOpened = true;
      } else {
        $scope.toOpened = true;
      }

    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
  });
