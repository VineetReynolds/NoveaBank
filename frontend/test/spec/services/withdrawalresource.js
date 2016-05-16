'use strict';

describe('Service: withdrawalResource', function () {

  // load the service's module
  beforeEach(module('noveaBankApp'));

  // instantiate service
  var withdrawalResource;
  beforeEach(inject(function (_withdrawalResource_) {
    withdrawalResource = _withdrawalResource_;
  }));

  it('should do something', function () {
    expect(!!withdrawalResource).toBe(true);
  });

});
