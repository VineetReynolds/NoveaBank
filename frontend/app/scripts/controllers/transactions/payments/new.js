'use strict';

/**
 * @ngdoc function
 * @name noveaBankApp.controller:TransactionsPaymentsNewCtrl
 * @description
 * # TransactionsPaymentsNewCtrl
 * Controller of the noveaBankApp
 */
angular.module('noveaBankApp')
  .controller('TransactionsPaymentsNewCtrl', function ($scope, $location, flash, contactResource, paymentResource) {
    $scope.contactsInStore = contactResource.queryAll({'customerId':auth.authz.idTokenParsed.sub});

    $scope.makePayment = function() {
      var transactionToStore = {'payeeId':$scope.payment.contact, 'amount':$scope.payment.amount};
      var successCallback = function(data,responseHeaders){
        flash.setMessage({'type':'success','text':'Your account has been debited.'});
        $location.path('/');
      };
      var errorCallback = function(httpResponse) {
        flash.setMessage({'type':'danger','text':httpResponse.data.message}, true);
        $scope.displayError = true;
      };
      paymentResource.save({'customerId':auth.authz.idTokenParsed.sub}, transactionToStore, successCallback, errorCallback);
    };

    $scope.clear = function() {
      $scope.payment = {};
    };
  });
