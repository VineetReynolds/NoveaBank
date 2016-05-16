'use strict';

describe('Controller: TransactionsPaymentsNewCtrl', function () {

  // load the controller's module
  beforeEach(module('noveaBankApp'));

  var TransactionsPaymentsNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransactionsPaymentsNewCtrl = $controller('TransactionsPaymentsNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransactionsPaymentsNewCtrl.awesomeThings.length).toBe(3);
  });
});
