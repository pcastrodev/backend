const { calcularMediaAluno } = require('../src/calcularMediaAluno.js');

test('A função calcularMediaAluno existe?', () => {
  expect(calcularMediaAluno).toBeDefined();
});

test('Se a1 ou a2 não forem informadas retorna erro', () => {
  expect(() => 
    calcularMediaAluno(undefined, 7)).toThrow('As notas a1 e a2 não foram informadas');
});

test('Se a1 ou a2 forem negativos retorna erro', () => {
  expect(() => 
    calcularMediaAluno(-2, 3)).toThrow('As notas a1 ou a2 não podem ser negativas');
});

test('Se a3 não for informada, calcular a média de a1 e a2', () => {
    expect(calcularMediaAluno(3, 5)).toBeCloseTo(3 * 0.4 + 5 * 0.6);
});

test('Se a3 for negativa retorna erro', () => {
    expect(() => 
        calcularMediaAluno(3, 5, -1)).toThrow('A nota a3 não pode ser negativa');
    });

test('Se a3 for informada e a melhor combinação é a1 com a3, calcular a média de a1 e a3', () => {
    expect(calcularMediaAluno(6, 5, 7)).toBeCloseTo(6 * 0.4 + 7 * 0.6);
});

test('Se a3 for informada e a melhor combinação é a2 com a3, calcular a média de a2 e a3', () => {
    expect(calcularMediaAluno(3, 5, 7)).toBeCloseTo(5 * 0.4 + 7 * 0.6);
});