'use strict';

/**
 * @ngdoc service
 * @name noveaBankApp.withdrawalResource
 * @description
 * # withdrawalResource
 * Factory in the noveaBankApp.
 */
angular.module('noveaBankApp')
  .factory('withdrawalResource', function($resource){
    var resource = $resource('/api/customers/:customerId/withdrawals/:withdrawalId',{withdrawalId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false}});
    return resource;
  });
