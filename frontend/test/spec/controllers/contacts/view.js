'use strict';

describe('Controller: ContactsViewCtrl', function () {

  // load the controller's module
  beforeEach(module('noveaBankApp'));

  var ContactsViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactsViewCtrl = $controller('ContactsViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContactsViewCtrl.awesomeThings.length).toBe(3);
  });
});
