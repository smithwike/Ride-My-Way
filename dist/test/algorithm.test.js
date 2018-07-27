'use strict';

require('babel-polyfill');

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _algorithm = require('../algorithm');

var _algorithm2 = _interopRequireDefault(_algorithm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Perform basic operations', function () {
  it('should add two numbers', function () {
    var res = _algorithm2.default.add(1, 3);
    (0, _expect2.default)(res).toBe(4);
  });

  it('should subtract two numbers', function () {
    var res = _algorithm2.default.subtract(1, 3);
    (0, _expect2.default)(res).toBe(-2);
  });

  it('should square the input number', function () {
    var res = _algorithm2.default.square(3);
    (0, _expect2.default)(res).toBe(9);
  });
});
//# sourceMappingURL=algorithm.test.js.map