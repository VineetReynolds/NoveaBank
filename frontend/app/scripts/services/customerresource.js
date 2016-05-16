'use strict';

/**
 * @ngdoc service
 * @name noveaBankApp.customerResource
 * @description
 * # customerResource
 * Factory in the noveaBankApp.
 */
angular.module('noveaBankApp')
  .factory('customerResource', function ($resource) {

	var resource = $resource('/api/customers/:customerId',{customerId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
	return resource;
  });
