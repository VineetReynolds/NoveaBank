'use strict';

describe('Controller: TransactionsWithdrawalsNewCtrl', function () {

  // load the controller's module
  beforeEach(module('noveaBankApp'));

  var TransactionsWithdrawalsNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransactionsWithdrawalsNewCtrl = $controller('TransactionsWithdrawalsNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransactionsWithdrawalsNewCtrl.awesomeThings.length).toBe(3);
  });
});
