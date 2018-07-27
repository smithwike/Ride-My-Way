import 'babel-polyfill';
import expect from 'expect';
import algorithm from '../algorithm';

describe('Perform basic operations', () => {
  it('should add two numbers', () => {
    const res = algorithm.add(1, 3);
    expect(res).toBe(4);
  });

  it('should subtract two numbers', () => {
    const res = algorithm.subtract(1, 3);
    expect(res).toBe(-2);
  });

  it('should square the input number', () => {
    const res = algorithm.square(3);
    expect(res).toBe(9);
  });
});
