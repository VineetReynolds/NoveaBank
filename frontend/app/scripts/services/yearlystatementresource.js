'use strict';

/**
 * @ngdoc service
 * @name noveaBankApp.yearlyStatementResource
 * @description
 * # yearlyStatementResource
 * Factory in the noveaBankApp.
 */
angular.module('noveaBankApp')
  .factory('yearlyStatementResource', function($resource){
    var resource = $resource('/api/customers/:customerId/reports/yearly',null,{'queryAll':{method:'GET',isArray:true}});
    return resource;
  });
