'use strict';

describe('Controller: FlashCtrl', function () {

  // load the controller's module
  beforeEach(module('noveaBankApp'));

  var FlashCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FlashCtrl = $controller('FlashCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FlashCtrl.awesomeThings.length).toBe(3);
  });
});
