'use strict';

/**
 * @ngdoc service
 * @name noveaBankApp.depositResource
 * @description
 * # depositResource
 * Factory in the noveaBankApp.
 */
angular.module('noveaBankApp')
  .factory('depositResource', function($resource){
    var resource = $resource('/api/customers/:customerId/deposits/:depositId',{depositId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false}});
    return resource;
  });
