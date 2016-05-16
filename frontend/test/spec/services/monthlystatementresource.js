'use strict';

describe('Service: monthlyStatementResource', function () {

  // load the service's module
  beforeEach(module('noveaBankApp'));

  // instantiate service
  var monthlyStatementResource;
  beforeEach(inject(function (_monthlyStatementResource_) {
    monthlyStatementResource = _monthlyStatementResource_;
  }));

  it('should do something', function () {
    expect(!!monthlyStatementResource).toBe(true);
  });

});
