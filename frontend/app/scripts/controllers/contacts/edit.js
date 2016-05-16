'use strict';

/**
 * @ngdoc function
 * @name noveaBankApp.controller:ContactsEditCtrl
 * @description
 * # ContactsEditCtrl
 * Controller of the noveaBankApp
 */
angular.module('noveaBankApp')
  .controller('ContactsEditCtrl', function ($scope, $location, $routeParams, flash, contactResource) {
    $scope.contact = contactResource.get({'customerId':auth.authz.idTokenParsed.sub, 'contactId':$routeParams.contactId}, function() {
      $scope.originalContact = $scope.contact;
    }, function() {
      flash.setMessage({'type':'danger','text':'The contact could not be loaded.'});
      $location.path('/contacts/view');
    });

    $scope.modifyContact = function() {
      $scope.contact.$update({'customerId':auth.authz.idTokenParsed.sub}, function () {
        flash.setMessage({'type':'success','text':'The contact was modified successfully.'});
        $location.path('/');
      }, function() {
        flash.setMessage({'type':'danger','text':'Failed to update the contact.'}, true);
      });
    };

    $scope.reset = function() {
      $scope.contact = $scope.originalContact;
    };
  });
