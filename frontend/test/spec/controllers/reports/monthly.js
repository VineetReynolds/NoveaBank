'use strict';

describe('Controller: ReportsMonthlyCtrl', function () {

  // load the controller's module
  beforeEach(module('noveaBankApp'));

  var ReportsMonthlyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportsMonthlyCtrl = $controller('ReportsMonthlyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReportsMonthlyCtrl.awesomeThings.length).toBe(3);
  });
});
