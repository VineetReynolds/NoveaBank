'use strict';

describe('Service: customStatementResource', function () {

  // load the service's module
  beforeEach(module('noveaBankApp'));

  // instantiate service
  var customStatementResource;
  beforeEach(inject(function (_customStatementResource_) {
    customStatementResource = _customStatementResource_;
  }));

  it('should do something', function () {
    expect(!!customStatementResource).toBe(true);
  });

});
