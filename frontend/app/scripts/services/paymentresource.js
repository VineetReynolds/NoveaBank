'use strict';

/**
 * @ngdoc service
 * @name noveaBankApp.paymentResource
 * @description
 * # paymentResource
 * Factory in the noveaBankApp.
 */
angular.module('noveaBankApp')
  .factory('paymentResource', function($resource){
    var resource = $resource('/api/customers/:customerId/payments/:paymentId',{paymentId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false}});
    return resource;
  });
