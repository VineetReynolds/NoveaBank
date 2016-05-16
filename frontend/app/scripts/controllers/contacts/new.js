'use strict';

/**
 * @ngdoc function
 * @name noveaBankApp.controller:ContactsNewCtrl
 * @description
 * # ContactsNewCtrl
 * Controller of the noveaBankApp
 */
angular.module('noveaBankApp')
  .controller('ContactsNewCtrl', function ($scope, $location, flash, contactResource) {
      $scope.registerContact = function() {
        var contactToStore = {'fullName':$scope.contact.name, 'iban':$scope.contact.iban};
        var successCallback = function(data,responseHeaders){
          flash.setMessage({'type':'success','text':'The contact was added successfully.'});
          $location.path('/');
        };
        var errorCallback = function() {
          $scope.displayError = true;
        };
        contactResource.save({'customerId':auth.authz.idTokenParsed.sub}, contactToStore, successCallback, errorCallback);
      };

      $scope.clearUser = function() {
        $scope.contact = {};
      };
  });
