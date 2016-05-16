'use strict';

/**
 * @ngdoc service
 * @name noveaBankApp.contactResource
 * @description
 * # contactResource
 * Factory in the noveaBankApp.
 */
angular.module('noveaBankApp')
  .factory('contactResource', function ($resource) {
      var resource = $resource('/api/customers/:customerId/contacts/:contactId',{contactId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
      return resource;
  });
