const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const square = a => a * a;

console.log(add(1, 3));
console.log(subtract(1, 3));
console.log(square(5));

module.exports = { add, subtract, square };
