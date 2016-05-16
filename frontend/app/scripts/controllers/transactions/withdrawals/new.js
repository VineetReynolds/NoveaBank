'use strict';

/**
 * @ngdoc function
 * @name noveaBankApp.controller:TransactionsWithdrawalsNewCtrl
 * @description
 * # TransactionsWithdrawalsNewCtrl
 * Controller of the noveaBankApp
 */
angular.module('noveaBankApp')
  .controller('TransactionsWithdrawalsNewCtrl', function ($scope, $location, flash, withdrawalResource) {
    $scope.makeWithdrawal = function() {
      var transactionToStore = {'amount':$scope.withdrawal.amount};
      var successCallback = function(data,responseHeaders){
        flash.setMessage({'type':'success','text':'Your account has been debited.'});
        $location.path('/');
      };
      var errorCallback = function(httpResponse) {
        flash.setMessage({'type':'danger','text':httpResponse.data.message}, true);
        $scope.displayError = true;
      };
      withdrawalResource.save({'customerId':auth.authz.idTokenParsed.sub}, transactionToStore, successCallback, errorCallback);
    };

    $scope.clear = function() {
      $scope.withdrawal = {};
    };
  });
