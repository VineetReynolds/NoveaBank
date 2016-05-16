'use strict';

describe('Service: contactResource', function () {

  // load the service's module
  beforeEach(module('noveaBankApp'));

  // instantiate service
  var contactResource;
  beforeEach(inject(function (_contactResource_) {
    contactResource = _contactResource_;
  }));

  it('should do something', function () {
    expect(!!contactResource).toBe(true);
  });

});
