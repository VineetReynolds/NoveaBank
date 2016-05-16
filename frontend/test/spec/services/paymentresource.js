'use strict';

describe('Service: paymentResource', function () {

  // load the service's module
  beforeEach(module('noveaBankApp'));

  // instantiate service
  var paymentResource;
  beforeEach(inject(function (_paymentResource_) {
    paymentResource = _paymentResource_;
  }));

  it('should do something', function () {
    expect(!!paymentResource).toBe(true);
  });

});
