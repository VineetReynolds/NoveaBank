'use strict';

/**
 * @ngdoc service
 * @name noveaBankApp.flash
 * @description
 * # flash
 * Service in the noveaBankApp.
 */
angular.module('noveaBankApp')
  .service('flash', function ($rootScope) {
      var messages = [];
      var currentMessage = {};

      $rootScope.$on('$routeChangeSuccess', function() {
        currentMessage = messages.shift() || {};
      });

      return {
        getMessage: function () {
          return currentMessage;
        },
        setMessage: function(message, pop) {
          messages.push(message);
          if(pop) {
            currentMessage = messages.shift() || {};
          }
        }
      };
  });
