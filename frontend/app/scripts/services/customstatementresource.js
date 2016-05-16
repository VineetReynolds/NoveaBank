'use strict';

/**
 * @ngdoc service
 * @name noveaBankApp.customStatementResource
 * @description
 * # customStatementResource
 * Factory in the noveaBankApp.
 */
angular.module('noveaBankApp')
  .factory('customStatementResource', function($resource){
    var resource = $resource('/api/customers/:customerId/reports/',null,{'queryAll':{method:'GET',isArray:true}});
    return resource;
  });
