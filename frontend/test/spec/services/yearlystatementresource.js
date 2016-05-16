'use strict';

describe('Service: yearlyStatementResource', function () {

  // load the service's module
  beforeEach(module('noveaBankApp'));

  // instantiate service
  var yearlyStatementResource;
  beforeEach(inject(function (_yearlyStatementResource_) {
    yearlyStatementResource = _yearlyStatementResource_;
  }));

  it('should do something', function () {
    expect(!!yearlyStatementResource).toBe(true);
  });

});
