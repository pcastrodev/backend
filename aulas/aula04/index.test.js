import { soma, subtracao, divisao, multiplicacao } from './index.js';

console.log('Teste da função soma()');
if (soma(2, 2) === 4) console.log('Passou 1º!')
else console.log('Falhou 1º!');

if (soma(-1, 2) === 1) console.log('Passou 2º!')
else console.log('Falhou 2º!');

if (soma(2, 0) === 2) console.log('Passou 3º!')
else console.log('Falhou 3º!');

console.log('Teste da função subtração()');
if (subtracao(4, 2) === 2) console.log('Passou 4º!')
else console.log('Falhou 4º!');

if (subtracao(-1, 2) === -3) console.log('Passou 5º!')
else console.log('Falhou 5º!');

if (subtracao(-2, 0) === -2) console.log('Passou 6º!')
else console.log('Falhou 6º!');

console.log('Teste da função divisao()');
if (divisao(4, 2) === 2) console.log('Passou 7º!')
else console.log('Falhou 7º!');

if (divisao(4, 0) === undefined) console.log('Passou 8º!')
else console.log('Falhou 8º!');

if (divisao(8, 4) === 2) console.log('Passou 9º!')
else console.log('Falhou 9º!');

console.log('Teste da função multiplicacao()');
if (multiplicacao(4, 2) === 8) console.log('Passou 10º!')
else console.log('Falhou 10º!');

if (multiplicacao(6, 2) === 12) console.log('Passou 11º!')
else console.log('Falhou 11º!');

if (multiplicacao(8, 4) === 32) console.log('Passou 12º!')
else console.log('Falhou 12º!');