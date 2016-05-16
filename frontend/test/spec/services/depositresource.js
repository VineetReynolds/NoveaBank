'use strict';

describe('Service: depositResource', function () {

  // load the service's module
  beforeEach(module('noveaBankApp'));

  // instantiate service
  var depositResource;
  beforeEach(inject(function (_depositResource_) {
    depositResource = _depositResource_;
  }));

  it('should do something', function () {
    expect(!!depositResource).toBe(true);
  });

});
