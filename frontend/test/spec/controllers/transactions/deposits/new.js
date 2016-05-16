'use strict';

describe('Controller: TransactionsDepositsNewCtrl', function () {

  // load the controller's module
  beforeEach(module('noveaBankApp'));

  var TransactionsDepositsNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransactionsDepositsNewCtrl = $controller('TransactionsDepositsNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransactionsDepositsNewCtrl.awesomeThings.length).toBe(3);
  });
});
