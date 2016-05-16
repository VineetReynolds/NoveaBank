'use strict';

describe('Controller: ContactsEditCtrl', function () {

  // load the controller's module
  beforeEach(module('noveaBankApp'));

  var ContactsEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactsEditCtrl = $controller('ContactsEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContactsEditCtrl.awesomeThings.length).toBe(3);
  });
});
