'use strict';

/**
 * @ngdoc function
 * @name noveaBankApp.controller:ContactsViewCtrl
 * @description
 * # ContactsViewCtrl
 * Controller of the noveaBankApp
 */
angular.module('noveaBankApp')
  .controller('ContactsViewCtrl', function ($scope, flash, $location, contactResource, filterFilter) {
      $scope.contacts = contactResource.queryAll({'customerId':auth.authz.idTokenParsed.sub}, function success(data) {}, function error(response) {
	      flash.setMessage({'type':'danger','text':'The contacts could not be loaded.'});
	      $location.path('/');
      });

      $scope.performSearch = function() {
        $scope.searchResults = filterFilter($scope.contacts, $scope.searchText);
      };

      $scope.performSearch();
  });
