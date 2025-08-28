function soma(a, b) {
    return a + b;
}

function subtracao(a, b) {
    return a - b;
}

function divisao(a, b) {
    if(b === 0) return undefined;
    return a / b;
}

function multiplicacao(a, b) {
    return a * b;
}

export { soma, subtracao, divisao, multiplicacao };