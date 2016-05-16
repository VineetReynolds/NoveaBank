'use strict';

describe('Controller: ReportsCustomCtrl', function () {

  // load the controller's module
  beforeEach(module('noveaBankApp'));

  var ReportsCustomCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportsCustomCtrl = $controller('ReportsCustomCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReportsCustomCtrl.awesomeThings.length).toBe(3);
  });
});
