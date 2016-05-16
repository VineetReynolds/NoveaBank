'use strict';

/**
 * @ngdoc service
 * @name noveaBankApp.monthlyStatementResource
 * @description
 * # monthlyStatementResource
 * Factory in the noveaBankApp.
 */
angular.module('noveaBankApp')
  .factory('monthlyStatementResource', function($resource){
    var resource = $resource('/api/customers/:customerId/reports/monthly',null,{'queryAll':{method:'GET',isArray:true}});
    return resource;
  });
