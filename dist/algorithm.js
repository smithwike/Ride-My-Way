"use strict";

var add = function add(a, b) {
  return a + b;
};
var subtract = function subtract(a, b) {
  return a - b;
};
var square = function square(a) {
  return a * a;
};

console.log(add(1, 3));
console.log(subtract(1, 3));
console.log(square(5));

module.exports = { add: add, subtract: subtract, square: square };
//# sourceMappingURL=algorithm.js.map