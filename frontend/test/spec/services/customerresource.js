'use strict';

describe('Service: customerResource', function () {

  // load the service's module
  beforeEach(module('noveaBankApp'));

  // instantiate service
  var customerResource;
  beforeEach(inject(function (_customerResource_) {
    customerResource = _customerResource_;
  }));

  it('should do something', function () {
    expect(!!customerResource).toBe(true);
  });

});
