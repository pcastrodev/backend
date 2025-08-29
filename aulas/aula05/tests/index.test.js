const calculadora = require('../src/index.js');

test("2 + 2 = 4", () => {
  expect(calculadora.soma).toBeDefined();
  expect(calculadora.soma(2, 2)).toBe(4);
});

test("2 + 0 = 2", () => {
  expect(calculadora.soma(2, 0)).toBe(2);
});

test("-2 + -2 = -4", () => {
  expect(calculadora.soma(-2, -2)).toBe(-4);
});

test("se a >= b então a - b >= 0", function(){
  expect(calculadora.subtracao).toBeDefined();
  expect(calculadora.subtracao(2, 1)).toBeGreaterThanOrEqual(0);
  expect(calculadora.subtracao(2, 2)).toBeGreaterThanOrEqual(0);
  expect(calculadora.subtracao(2, -2)).toBeGreaterThanOrEqual(0);
  expect(calculadora.subtracao(-2, -4)).toBeGreaterThanOrEqual(0);
});

test("se a < b então a - b < 0", function(){
  expect(calculadora.subtracao(1, 2)).toBeLessThan(0);
  expect(calculadora.subtracao(-2, -1)).toBeLessThan(0);
  expect(calculadora.subtracao(-2, 1)).toBeLessThan(0);
});

test("se a e b < 0 ou a e b > 0 então a * b > 0", function(){
  expect(calculadora.multiplicacao).toBeDefined();
  expect(calculadora.multiplicacao(2, 2)).toBeGreaterThan(0);
  expect(calculadora.multiplicacao(-2, -2)).toBeGreaterThan(0);
  expect(calculadora.multiplicacao(1, 1)).toBeGreaterThan(0);
  expect(calculadora.multiplicacao(-1, -1)).toBeGreaterThan(0);
});

test("se a < 0 ou b < 0 então a * b < 0", function(){
  expect(calculadora.multiplicacao(2, -2)).toBeLessThan(0);
  expect(calculadora.multiplicacao(-2, 2)).toBeLessThan(0);
  expect(calculadora.multiplicacao(1, -1)).toBeLessThan(0);
  expect(calculadora.multiplicacao(-1, 1)).toBeLessThan(0);
});

// test("se a = 0 ou b = 0 então a * b = 0", function(){
//   expect(calculadora.multiplicacao(2, 0)).toBe(0);
//   expect(calculadora.multiplicacao(-2, 0)).toBe(0);
// });

test("se b = 0 então Divisão por ZERO", () => {
  expect(calculadora.divisao).toBeDefined();
  expect(() => { calculadora.divisao(2, 0) })
    .toThrow("Divisão por ZERO");
});
