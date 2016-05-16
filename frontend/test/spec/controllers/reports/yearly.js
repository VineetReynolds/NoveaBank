'use strict';

describe('Controller: ReportsYearlyCtrl', function () {

  // load the controller's module
  beforeEach(module('noveaBankApp'));

  var ReportsYearlyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportsYearlyCtrl = $controller('ReportsYearlyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReportsYearlyCtrl.awesomeThings.length).toBe(3);
  });
});
