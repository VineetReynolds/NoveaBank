'use strict';

describe('Controller: ContactsNewCtrl', function () {

  // load the controller's module
  beforeEach(module('noveaBankApp'));

  var ContactsNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactsNewCtrl = $controller('ContactsNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContactsNewCtrl.awesomeThings.length).toBe(3);
  });
});
